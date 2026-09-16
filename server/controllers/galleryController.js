import pool from "../db.js";
import cloudinary from "../cloudinary.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

/*
    GET ALL GALLERY IMAGES
    Optional:
    /api/gallery?category=curtains
    /api/gallery?category=blinds
*/
export async function getGallery(req, res) {
    try {
        const { category } = req.query;

        let query = `SELECT * FROM gallery`;
        const values = [];

        if (category) {
            query += ` WHERE category = $1`;
            values.push(category);
        }

        query += ` ORDER BY created_at DESC`;

        const result = await pool.query(query, values);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching gallery:", error);

        res.status(500).json({
            message: "Failed to fetch gallery"
        });
    }
}


/*
    UPLOAD GALLERY IMAGE

    Image:
    Frontend -> Multer memory -> Cloudinary -> PostgreSQL
*/
export async function uploadGalleryImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please select an image."
            });
        }

        const { category } = req.body;

        if (category !== "curtains" && category !== "blinds") {
            return res.status(400).json({
                message: "Invalid gallery category."
            });
        }

        // Upload image to Cloudinary
        const result = await uploadToCloudinary(
            req.file.buffer,
            `lucky-home-decor/gallery/${category}`
        );

        const imageUrl = result.secure_url;
        const publicId = result.public_id;

        // Save Cloudinary information in PostgreSQL
        const dbResult = await pool.query(
            `
            INSERT INTO gallery
            (image_url, category, public_id)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [
                imageUrl,
                category,
                publicId
            ]
        );

        res.status(201).json({
            message: "Image uploaded successfully",
            image: dbResult.rows[0]
        });

    } catch (error) {
        console.error("Error uploading gallery image:", error);

        res.status(500).json({
            message: "Failed to upload image",
            error: error.message
        });
    }
}


/*
    DELETE GALLERY IMAGE

    PostgreSQL record + Cloudinary image
*/
export async function deleteGalleryImage(req, res) {
    try {
        const { id } = req.params;

        // First find the image
        const existingResult = await pool.query(
            `
            SELECT *
            FROM gallery
            WHERE id = $1
            `,
            [id]
        );

        if (existingResult.rows.length === 0) {
            return res.status(404).json({
                message: "Image not found"
            });
        }

        const image = existingResult.rows[0];

        /*
            Delete from Cloudinary if public_id exists.

            Older images may not have a public_id.
            In that case we only remove the database record.
        */
        if (image.public_id) {
            try {
                await cloudinary.uploader.destroy(
                    image.public_id,
                    {
                        resource_type: "image",
                        invalidate: true
                    }
                );
            } catch (cloudinaryError) {
                console.warn(
                    "Could not delete image from Cloudinary:",
                    cloudinaryError.message
                );
            }
        }

        // Delete database record
        await pool.query(
            `
            DELETE FROM gallery
            WHERE id = $1
            `,
            [id]
        );

        res.json({
            message: "Image deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting gallery image:", error);

        res.status(500).json({
            message: "Failed to delete image",
            error: error.message
        });
    }
}