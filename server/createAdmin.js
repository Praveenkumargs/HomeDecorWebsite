import bcrypt from "bcrypt";
import pool from "./db.js";

const username = "admin";
const password = "admin123";

const createAdmin = async () => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO admins (username, password_hash)
             VALUES ($1, $2)`,
            [username, passwordHash]
        );

        console.log("Admin created successfully");

    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await pool.end();
    }
};

createAdmin();