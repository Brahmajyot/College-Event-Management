import express from "express";
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  deleteEvent, 
  joinEvent 
} from "../controllers/eventController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);

router.post("/", requireAuth, createEvent);
router.delete("/:id", requireAuth, deleteEvent);
router.post("/:id/join", requireAuth, joinEvent);

export default router;