import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true, 
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rollNumber: {
      type: String, 
      unique: true, 
      sparse: true, 
    },
    department: {
      type: String,
      enum: ["CSE", "ECE", "MECH", "CIVIL", "MBA", "Other"],
    },
    year: {
      type: Number, 
    },
    role: {
      type: String,
      enum: ["student", "organizer", "admin"],
      default: "student",
    },
    
    interests: [{
      type: String, 
    }],
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);