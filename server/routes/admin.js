import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/dashboard", authenticateAdmin, (req, res) => {
    res.json({
        message: "Welcome to the admin dashboard",
        admin: req.admin
    });
});

export default router;