import express from "express";

import {
    getPortfolio,
    getPortfolioById,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} from "../controllers/portfolioController.js";

import { authenticateAdmin } from "../middleware/auth.js";
import portfolioUpload from "../middleware/portfolioUpload.js";

const router = express.Router();


// ================================
// PUBLIC
// ================================

router.get("/", getPortfolio);

router.get("/:id", getPortfolioById);


// ================================
// ADMIN
// ================================

router.post(
    "/",
    authenticateAdmin,
    portfolioUpload.single("image"),
    createPortfolio
);


router.put(
    "/:id",
    authenticateAdmin,
    portfolioUpload.single("image"),
    updatePortfolio
);


router.delete(
    "/:id",
    authenticateAdmin,
    deletePortfolio
);


export default router;