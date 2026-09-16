import pool from "../db.js";
import cloudinary from "../cloudinary.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";


/*
    GET ALL PORTFOLIO PROJECTS
*/
export async function getPortfolio(req, res) {
    try {
        const result = await pool.query(
            `
            SELECT *
            FROM portfolio
            ORDER BY created_at DESC
            `
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching portfolio:", error);

        res.status(500).json({
            message: "Failed to fetch portfolio"
        });
    }
}


/*
    GET SINGLE PORTFOLIO PROJECT
*/
export async function getPortfolioById(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM portfolio
            WHERE id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Portfolio not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(
            "Error fetching portfolio project:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch portfolio project"
        });
    }
}


/*
    CREATE PORTFOLIO PROJECT

    Image flow:

    Frontend
       ↓
    Multer memoryStorage
       ↓
    Cloudinary
       ↓
    PostgreSQL
*/
export async function createPortfolio(req, res) {
    try {
        const {
            title,
            category,
            description,
            location
        } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                message: "Title and category are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a project image"
            });
        }

        /*
            Upload portfolio image to Cloudinary
        */
        const cloudinaryResult =
            await uploadToCloudinary(
                req.file.buffer,
                `lucky-home-decor/portfolio/${category}`
            );

        const image_url =
            cloudinaryResult.secure_url;

        const public_id =
            cloudinaryResult.public_id;


        /*
            Save project in PostgreSQL
        */
        const result = await pool.query(
            `
            INSERT INTO portfolio
            (
                title,
                category,
                description,
                image_url,
                location,
                public_id
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [
                title,
                category,
                description || "",
                image_url,
                location || "",
                public_id
            ]
        );

        res.status(201).json({
            message:
                "Portfolio project created successfully",
            project: result.rows[0]
        });

    } catch (error) {
        console.error(
            "Error creating portfolio project:",
            error
        );

        res.status(500).json({
            message:
                "Failed to create portfolio project",
            error: error.message
        });
    }
}


/*
    UPDATE PORTFOLIO PROJECT

    If a new image is uploaded:

    New image
       ↓
    Cloudinary
       ↓
    Delete old Cloudinary image
       ↓
    Update PostgreSQL
*/
export async function updatePortfolio(req, res) {
    try {
        const { id } = req.params;

        const {
            title,
            category,
            description,
            location
        } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                message:
                    "Title and category are required"
            });
        }


        /*
            Get existing project
        */
        const existingResult = await pool.query(
            `
            SELECT *
            FROM portfolio
            WHERE id = $1
            `,
            [id]
        );

        if (existingResult.rows.length === 0) {
            return res.status(404).json({
                message:
                    "Portfolio project not found"
            });
        }

        const existingProject =
            existingResult.rows[0];


        /*
            Keep existing image by default
        */
        let image_url =
            existingProject.image_url;

        let public_id =
            existingProject.public_id;


        /*
            If a NEW image was uploaded
        */
        if (req.file) {

            /*
                Upload new image
            */
            const cloudinaryResult =
                await uploadToCloudinary(
                    req.file.buffer,
                    `lucky-home-decor/portfolio/${category}`
                );

            image_url =
                cloudinaryResult.secure_url;

            public_id =
                cloudinaryResult.public_id;


            /*
                Delete OLD Cloudinary image

                Only do this if the old record
                actually has a Cloudinary public_id.
            */
            if (existingProject.public_id) {
                try {
                    await cloudinary.uploader.destroy(
                        existingProject.public_id,
                        {
                            resource_type: "image",
                            invalidate: true
                        }
                    );

                    console.log(
                        "Old Cloudinary image deleted:",
                        existingProject.public_id
                    );

                } catch (cloudinaryError) {
                    console.warn(
                        "Could not delete old Cloudinary image:",
                        cloudinaryError.message
                    );
                }
            }
        }


        /*
            Update PostgreSQL
        */
        const result = await pool.query(
            `
            UPDATE portfolio
            SET
                title = $1,
                category = $2,
                description = $3,
                image_url = $4,
                location = $5,
                public_id = $6
            WHERE id = $7
            RETURNING *
            `,
            [
                title,
                category,
                description || "",
                image_url,
                location || "",
                public_id,
                id
            ]
        );


        res.json({
            message:
                "Portfolio project updated successfully",
            project: result.rows[0]
        });

    } catch (error) {
        console.error(
            "Error updating portfolio project:",
            error
        );

        res.status(500).json({
            message:
                "Failed to update portfolio project",
            error: error.message
        });
    }
}


/*
    DELETE PORTFOLIO PROJECT

    PostgreSQL record + Cloudinary image
*/
export async function deletePortfolio(req, res) {
    try {
        const { id } = req.params;


        /*
            Find existing project
        */
        const existingResult = await pool.query(
            `
            SELECT *
            FROM portfolio
            WHERE id = $1
            `,
            [id]
        );

        if (existingResult.rows.length === 0) {
            return res.status(404).json({
                message:
                    "Portfolio project not found"
            });
        }

        const project =
            existingResult.rows[0];


        /*
            Delete Cloudinary image
        */
        if (project.public_id) {

            try {
                await cloudinary.uploader.destroy(
                    project.public_id,
                    {
                        resource_type: "image",
                        invalidate: true
                    }
                );

                console.log(
                    "Cloudinary image deleted:",
                    project.public_id
                );

            } catch (cloudinaryError) {

                console.warn(
                    "Could not delete Cloudinary image:",
                    cloudinaryError.message
                );
            }
        }


        /*
            Delete PostgreSQL record
        */
        const result = await pool.query(
            `
            DELETE FROM portfolio
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );


        res.json({
            message:
                "Portfolio project deleted successfully",
            project: result.rows[0]
        });

    } catch (error) {

        console.error(
            "Error deleting portfolio project:",
            error
        );

        res.status(500).json({
            message:
                "Failed to delete portfolio project",
            error: error.message
        });
    }
}