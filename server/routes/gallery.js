import express from "express";

import {
    getGallery,
    uploadGalleryImage,
    deleteGalleryImage
} from "../controllers/galleryController.js";

import upload from "../middleware/upload.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();


// Public
router.get("/", getGallery);


// Admin
router.post(
    "/upload",
    authenticateAdmin,
    upload.single("image"),
    uploadGalleryImage
);


router.delete(
    "/:id",
    authenticateAdmin,
    deleteGalleryImage
);


export default router;