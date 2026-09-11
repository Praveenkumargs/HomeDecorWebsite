import express from "express";

import {
    getPortfolio,
    getPortfolioById,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} from "../controllers/portfolioController.js";

import { authenticateAdmin } from "../middleware/auth.js"; 

const router = express.Router();

router.get("/", getPortfolio);

router.get("/:id", getPortfolioById);

router.post("/", authenticateAdmin, createPortfolio);

router.put("/:id", authenticateAdmin, updatePortfolio)

router.delete("/:id", authenticateAdmin, deletePortfolio);

export default router;