import pool from "../db.js";


// =========================
// GET GALLERY
// =========================

export async function getGallery(req, res) {

    try {

        const { category } = req.query;

        let query = `
            SELECT *
            FROM gallery
        `;

        let values = [];

        if (category) {

            query += `
                WHERE category = $1
            `;

            values.push(category);
        }

        query += `
            ORDER BY created_at DESC
        `;

        const result = await pool.query(
            query,
            values
        );

        res.json(result.rows);

    } catch (error) {

        console.error("Error fetching gallery:", error);

        res.status(500).json({
            message: "Failed to fetch gallery"
        });
    }
}


// =========================
// UPLOAD IMAGE
// =========================

export async function uploadGalleryImage(req, res) {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "Please select an image."
            });
        }

        const { category } = req.body;

        if (
            category !== "curtains" &&
            category !== "blinds"
        ) {

            return res.status(400).json({
                message: "Invalid gallery category."
            });
        }

        const imageUrl =
            `/uploads/${category}/${req.file.filename}`;

        const result = await pool.query(
            `
            INSERT INTO gallery
            (image_url, category)
            VALUES ($1, $2)
            RETURNING *
            `,
            [
                imageUrl,
                category
            ]
        );

        res.status(201).json({
            message: "Image uploaded successfully",
            image: result.rows[0]
        });

    } catch (error) {

        console.error(
            "Error uploading gallery image:",
            error
        );

        res.status(500).json({
            message: "Failed to upload image"
        });
    }
}


// =========================
// DELETE IMAGE
// =========================

export async function deleteGalleryImage(req, res) {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM gallery
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Image not found"
            });
        }

        res.json({
            message: "Image deleted successfully"
        });

    } catch (error) {

        console.error(
            "Error deleting gallery image:",
            error
        );

        res.status(500).json({
            message: "Failed to delete image"
        });
    }
}