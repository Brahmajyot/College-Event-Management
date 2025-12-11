import express from "express";
import { generateEventDetails } from "../controllers/aiController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", requireAuth, generateEventDetails);

export default router;