import express from "express";
import upload from "../middleware/upload.js"; 
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
   
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "college-events", 
    });

    res.json({ url: result.secure_url });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

export default router;