import express from "express";
import { syncUser, getMe } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sync", syncUser);

router.get("/me", requireAuth, getMe);

export default router;