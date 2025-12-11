import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    

    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    venue: { type: String, required: true },
    registrationDeadline: { type: Date, required: true },
    
    category: {
      type: String,
      enum: ["Technical", "Cultural", "Sports", "Workshop", "Seminar"],
      required: true,
    },
    
 
    isTeamEvent: { type: Boolean, default: false },
    teamSize: {
      min: { type: Number, default: 1 },
      max: { type: Number, default: 1 },
    },

    
    capacity: { type: Number, required: true },
    registeredCount: { type: Number, default: 0 },
    
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },

    
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);