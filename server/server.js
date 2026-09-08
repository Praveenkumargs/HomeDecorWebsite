import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import adminRoutes from "../server/routes/admin.js";
import { authenticateAdmin } from "../server/middleware/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.get("/", (req,res) => {
    res.json({
        message: "Curtains Interiors API is running",
        status: "success",
        image: "../src/assets/Curtains.jpeg"
    });
});

app.get("/api/products", async (req,res) =>{

    try {
        
        const result = await pool.query(
        "SELECT * FROM products ORDER BY id"
    );

    res.json(result.rows);

    } catch (error) {
        console.error("Error fetching products: ", error)

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});

app.post("/api/products", authenticateAdmin, async (req,res) => {
    try {
        const {
            name,
            category,
            description,
            image_url
        } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                message: "Name and Category are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO products
            (name,category,description,image_url) 
            VALUES ($1,$2,$3,$4) 
            RETURNING *`,[
                name,
                category,
                description,
                image_url
            ]
        );

        res.status(201).json({
            message: "Product created successfully.",
            product: result.rows[0]
        });

    } catch (error) {
        console.error("Error creating product:", error);

        res.status(500).json({
            message: "Failed to create product"
        });
    }
});

app.get("/api/products/:id", async (req, res) => {

    try {
        const id = Number(req.params.id);
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",[id]
        );

        if(result.rows.length == 0) {

            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Error fetching product:", error);

        res.status(500).json({
            message: "Failed to fetch product"
        });
    }

});

app.post("/api/enquiries", async (req,res) => {
    try {
        
        const {
            name,
            phone,
            email,
            service,
            message
        } = req.body;


        if (!name || !phone) {
            return res.status(400).json({
                message: "Name and phone number required."
            });
        }

        const result = await pool.query(
            `INSERT INTO enquiries
            (name, phone, email, service, message)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                name,
                phone,
                email,
                service,
                message
            ]
        );

        res.status(201).json({
            message: "Enquiry submitted successfully.",
            enquiry: result.rows[0]
        });

    } catch (error) {
        console.error("Error creating enquiry:", error);

        res.status(500).json({
            message: "Failed to submit enquiry"
        });
    }
});

app.listen(port, () => {
    console.log("Server is Running in", port);
    
});
