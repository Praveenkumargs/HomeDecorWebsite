import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

export async function getStats(req, res) {

    try {

        const productsResult = await pool.query(
            "SELECT COUNT(*) FROM products"
        );

        const portfolioResult = await pool.query(
            "SELECT COUNT(*) FROM portfolio"
        );

        const enquiriesResult = await pool.query(
            "SELECT COUNT(*) FROM enquiries"
        );

        const reviewsResult = await pool.query(
            "SELECT COUNT(*) FROM reviews"
        );


        res.json({

            products: Number(
                productsResult.rows[0].count
            ),

            portfolio: Number(
                portfolioResult.rows[0].count
            ),

            enquiries: Number(
                enquiriesResult.rows[0].count
            ),

            reviews: Number(
                reviewsResult.rows[0].count
            )

        });

    } catch (error) {

        console.error(
            "Error fetching dashboard stats:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch dashboard stats"
        });

    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password were provided
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        // Find admin in database
        const result = await pool.query(
            "SELECT * FROM admins WHERE username = $1",
            [username]
        );

        // Admin doesn't exist
        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const admin = result.rows[0];

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            admin.password_hash
        );

        // Password is incorrect
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: admin.id,
                username: admin.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        // Send successful response
        res.json({
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);

        res.status(500).json({
            message: "Server error during login"
        });
    }
};