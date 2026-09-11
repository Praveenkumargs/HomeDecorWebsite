import pool from "../db.js";

export async function getPortfolio(req,res) {

    try {
        
        const result = await pool.query(
            `SELECT *
            FROM portfolio
            ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching portfolio:", error);

        res.status(500).json({
            message: "Failed to fetch portfolio"
        });
    }
    
}

export async function getPortfolioById(req,res) {
    try {
        
        const { id } = req.params;

        const result = await pool.query(
            `SELECT * 
            FROM portfolio
            WHERE id=$1`,[id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Portfolio not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Error fetching portfolio project:", error);

        res.status(500).json({
            message: "Failed to fetch portfolio projects"
        })
    }
}

export async function createPortfolio(req,res) {

    try {
        
        const {
            title,
            category,
            description,
            image_url,
            location
        } = req.body;

        if (!title || !category || !image_url) {
            return res.status(400).json({
                message: "Title, category and image URL are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO portfolio
            (title,category,description,image_url,location)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *`,[
                title,
                category,
                description || "",
                image_url,
                location || ""
            ]
        )

        res.status(201).json({
            message: "Portfolio project created successfully",
            project: result.rows[0]
        });
    } catch (error) {
        console.error("Error creating portfolio projects:", error);

        res.status(500).json({
            message: "Failed to create portfolio project"
        });
    }

}


export async function updatePortfolio(req,res) {

    try {
        
        const { id } = req.params;

        const {
            title,
            category,
            description,
            image_url,
            location
        } = req.body;

        if (!title || !category || !image_url) {
            return res.status(400).json({
                message: "Title, category and image URL are required"
            });
        }

        const result = await pool.query(
            `UPDATE portfolio 
            SET
                title=$1,
                category=$2,
                description=$3,
                image_url=$4,
                location=$5
            WHERE id= $6
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

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Portfolio project not found"
            });
        }

        res.json({
            message: "Portfolio project updated successfully",
            project: result.rows[0]
        });

    } catch (error) {
        console.error("Error updating portfolio projects:", error);

        res.status(500).json({
            message: "Failed to update portfolio project"
        });
    }
}
export async function deletePortfolio(req, res) { 
    try { 
        const { id } = req.params; 
        
        const result = await pool.query( 
            `DELETE FROM portfolio WHERE id = $1 RETURNING *`, [id] 
        ); 
        if (result.rows.length === 0) { 
            return res.status(404).json({ 
                message: "Portfolio project not found" 
            }); 
        } 
        
        res.json({ 
            message: "Portfolio project deleted successfully", 
            project: result.rows[0] 
        }); 
    } catch (error) { 
        console.error( 
            "Error deleting portfolio project:", error 
        ); 
        res.status(500).json({ 
            message: "Failed to delete portfolio project" 
        }); 
    } 
}
