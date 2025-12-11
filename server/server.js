import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


dotenv.config();


connectDB();


const app = express();


const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:3000",
  process.env.CLIENT_URL,  
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);     
app.use("/api/events", eventRoutes);  
app.use("/api/ai", aiRoutes);         
app.use("/api/upload", uploadRoutes); 

app.get("/", (req, res) => {
  res.send("API is running... 🚀");
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ 
    message: "Internal Server Error", 
    error: err.message 
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});