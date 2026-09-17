import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import adminRoutes from "../server/routes/admin.js";
import { authenticateAdmin } from "../server/middleware/auth.js";
import portfolioRoutes from "../server/routes/portfolio.js";
import galleryRoutes from "../server/routes/gallery.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests without an origin
            // and localhost during development
            if (
                !origin ||
                origin === "http://localhost:5173" ||
                origin.endsWith(".vercel.app") ||
                origin === "https://luckyhomedecor.in" ||
                origin === "https://www.luckyhomedecor.in"
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    })
);
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/gallery", galleryRoutes);

app.use(
    "/uploads",
    express.static(
        path.join(process.cwd(), "uploads")
    )
);

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

app.put('/api/products/:id', authenticateAdmin, async (req,res) => {
    try {
        
        const { id } = req.params;

        const {
            name,
            category,
            description,
            image_url
        } = req.body;

        const result = await pool.query(
            `UPDATE products
            SET name=$1,
            category=$2,
            description=$3,
            image_url=$4
            WHERE id=$5
            RETURNING *`,[
                name,
                category,
                description,
                image_url,
                id
            ]
        );

        if(result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        res.json({
            message: "Product updated successfully",
            product: result.rows[0]
        })

    } catch (error) {
        console.error("Error updating product:", error);

        res.status(500).json({
            message: "Failed to update product"
        });
    }
});

app.delete('/api/products/:id', authenticateAdmin, async (req,res) => {
    try {
    
        const { id } = req.params;

        const result = await pool.query(
           `DELETE FROM products WHERE id=$1 RETURNING *`,[id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully",
            product: result.rows[0]
        });
        
    } catch (error) {
        console.error("Error deleting product:",error);

        res.status(500).json({
            message: "Failed to delete product"
        });
    }
});

app.get('/api/reviews', async (req,res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM reviews ORDER BY created_at DESC`
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching reviews:", error);

        res.status(500).json({
            message: "Failed to fetch reviews"
        });
    }
});

app.post("/api/reviews", authenticateAdmin, async (req,res) => {

    try {
        const {
        customer_name,
        rating,
        review,
        location
        } = req.body;

        if (!customer_name || !review || !rating || !location) {
            return res.status(400).json({
                message: "Customer name, review, rating and location required"
            });
        }

        if(rating<1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        const result = await pool.query(
            `INSERT INTO reviews 
            (customer_name,rating,review,location)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,[
                customer_name, rating,review,location
            ]
        );

        res.status(201).json({
            message: "Review added successfully",
            product: result.rows[0]
        });

    } catch (error) {
        console.error("Error adding review:", error);

        res.status(500).json({
            message: "Failed to add review"
        });
    }
});

app.put("/api/reviews/:id", authenticateAdmin, async (req,res) => {
    try {
        
        const { id } = req.params;
        const {
            customer_name,
            rating,
            review
        } = req.body;

        if (!customer_name || !rating || !review) {
            return res.status(400).json({
                message: "Customer name, rating and review is required."
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating msut be between 1 and 5"
            });
        }

        const result = await pool.query(
            `UPDATE reviews
            SET customer_name=$1,
            rating=$2,
            review=$3
            WHERE id=$4
            RETURNING *`,[
                customer_name,
                rating,
                review,
                id
            ]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.json({
            message: "Review updated successfully",
            review: result.rows[0]
        });
    } catch (error) {
        console.error("Error updating review:", error);

        res.status(500).json({
            message: "failed to update review"
        });   
    }
});

app.delete("/api/reviews/:id", authenticateAdmin, async (req,res) => {

    try {
        
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM reviews WHERE id=$1 RETURNING *`,[id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.json({
            message:"Review deleted successfully",
            product: result.rows[0]
        });
    } catch (error) {
        console.error("Error deleting review:",error);

        res.status(500).json({
            message: "Failed to delete review"
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

app.get("/api/enquiries", authenticateAdmin, async (req,res) => {
    try {
        
        const result = await pool.query(
            `SELECT * FROM enquiries
            ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching enquiries:", error);

        res.status(500).json({
            message: "Failed to fetch enquiries"
        });
    }
});

app.delete("/api/enquiries/:id", authenticateAdmin, async (req,res) => {
    try {
        
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM enquiries WHERE id=$1 RETURNING *`,[id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Enquiry not found"
            });
        }

        res.json({
            message: "Enquiry deleted successfully",
            enquiry: result.rows[0]
        });
    } catch (error) {

        console.error("Error deleting enquiry:", error);

        res.status(500).json({
            message: "Failed to delete enquiry"
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

app.listen(PORT,"0.0.0.0", () => {
    console.log("Server is Running in", PORT);
    
});