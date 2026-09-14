import pool from "../db.js";
import fs from "fs/promises";
import path from "path";


// ================================
// GET PORTFOLIO
// ================================

export async function getPortfolio(req, res) {

    try {

        const result = await pool.query(
            `SELECT *
             FROM portfolio
             ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {

        console.error(
            "Error fetching portfolio:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch portfolio"
        });
    }
}


// ================================
// GET PORTFOLIO BY ID
// ================================

export async function getPortfolioById(req, res) {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT *
             FROM portfolio
             WHERE id = $1`,
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


// ================================
// CREATE PORTFOLIO
// ================================

export async function createPortfolio(req, res) {

    try {

        const {
            title,
            category,
            description,
            location
        } = req.body;


        // -------------------------
        // VALIDATION
        // -------------------------

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


        // -------------------------
        // CREATE IMAGE URL
        // -------------------------

        const image_url =
            `/uploads/portfolio/${req.file.filename}`;


        // -------------------------
        // INSERT
        // -------------------------

        const result = await pool.query(
            `INSERT INTO portfolio
            (
                title,
                category,
                description,
                image_url,
                location
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                title,
                category,
                description || "",
                image_url,
                location || ""
            ]
        );


        res.status(201).json({

            message:
                "Portfolio project created successfully",

            project:
                result.rows[0]
        });


    } catch (error) {

        console.error(
            "Error creating portfolio project:",
            error
        );

        res.status(500).json({

            message:
                "Failed to create portfolio project",

            error:
                error.message
        });
    }
}


// ================================
// UPDATE PORTFOLIO
// ================================

export async function updatePortfolio(req, res) {

    try {

        const { id } = req.params;

        const {
            title,
            category,
            description,
            location
        } = req.body;


        // -------------------------
        // VALIDATION
        // -------------------------

        if (!title || !category) {

            return res.status(400).json({
                message: "Title and category are required"
            });
        }


        // -------------------------
        // GET EXISTING PROJECT
        // -------------------------

        const existingResult = await pool.query(
            `SELECT *
             FROM portfolio
             WHERE id = $1`,
            [id]
        );


        if (existingResult.rows.length === 0) {

            return res.status(404).json({
                message: "Portfolio project not found"
            });
        }


        const existingProject =
            existingResult.rows[0];


        // -------------------------
        // KEEP OLD IMAGE
        // -------------------------

        let image_url =
            existingProject.image_url;


        // -------------------------
        // NEW IMAGE SELECTED
        // -------------------------

        if (req.file) {

            image_url =
                `/uploads/portfolio/${req.file.filename}`;
        }


        // -------------------------
        // UPDATE DATABASE
        // -------------------------

        const result = await pool.query(
            `UPDATE portfolio
             SET
                title = $1,
                category = $2,
                description = $3,
                image_url = $4,
                location = $5
             WHERE id = $6
             RETURNING *`,
            [
                title,
                category,
                description || "",
                image_url,
                location || "",
                id
            ]
        );


        // -------------------------
        // DELETE OLD IMAGE
        // ONLY IF NEW IMAGE WAS UPLOADED
        // -------------------------

        if (
            req.file &&
            existingProject.image_url &&
            existingProject.image_url.startsWith(
                "/uploads/portfolio/"
            )
        ) {

            const oldImagePath =
                path.join(
                    process.cwd(),
                    existingProject.image_url
                        .replace(/^\/+/, "")
                );


            try {

                await fs.unlink(oldImagePath);

            } catch (error) {

                // File may already be missing.
                console.warn(
                    "Could not delete old portfolio image:",
                    error.message
                );
            }
        }


        res.json({

            message:
                "Portfolio project updated successfully",

            project:
                result.rows[0]
        });


    } catch (error) {

        console.error(
            "Error updating portfolio project:",
            error
        );

        res.status(500).json({

            message:
                "Failed to update portfolio project",

            error:
                error.message
        });
    }
}


// ================================
// DELETE PORTFOLIO
// ================================

export async function deletePortfolio(req, res) {

    try {

        const { id } = req.params;


        // -------------------------
        // GET PROJECT FIRST
        // -------------------------

        const existingResult = await pool.query(
            `SELECT *
             FROM portfolio
             WHERE id = $1`,
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


        // -------------------------
        // DELETE DATABASE RECORD
        // -------------------------

        const result = await pool.query(
            `DELETE FROM portfolio
             WHERE id = $1
             RETURNING *`,
            [id]
        );


        // -------------------------
        // DELETE PHYSICAL IMAGE
        // -------------------------

        if (
            project.image_url &&
            project.image_url.startsWith(
                "/uploads/portfolio/"
            )
        ) {

            const imagePath =
                path.join(
                    process.cwd(),
                    project.image_url
                        .replace(/^\/+/, "")
                );


            try {

                await fs.unlink(imagePath);

            } catch (error) {

                console.warn(
                    "Could not delete portfolio image:",
                    error.message
                );
            }
        }


        res.json({

            message:
                "Portfolio project deleted successfully",

            project:
                result.rows[0]
        });


    } catch (error) {

        console.error(
            "Error deleting portfolio project:",
            error
        );

        res.status(500).json({

            message:
                "Failed to delete portfolio project"
        });
    }
}