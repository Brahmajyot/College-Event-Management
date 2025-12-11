import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

const getMongoUser = async (clerkId) => {
  return await User.findOne({ clerkId });
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email avatar")
      .sort({ date: 1 });
      
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email avatar")
      .populate("attendees", "name email avatar"); 

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { 
      title, description, bannerUrl, date, time, 
      venue, category, capacity, isTeamEvent, teamSize 
    } = req.body;

    const user = await getMongoUser(req.auth.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!title || !date || !venue || !capacity) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const newEvent = new Event({
      title,
      description,
      bannerUrl,
      date,
      time,
      venue,
      category,
      capacity,
      isTeamEvent,
      teamSize,
      organizer: user._id, 
      registeredCount: 0,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await getMongoUser(req.auth.userId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event removed" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await getMongoUser(req.auth.userId);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (!user) return res.status(404).json({ message: "User profile not found. Please login again." });

    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    if (event.attendees.includes(user._id)) {
      return res.status(400).json({ message: "You are already registered" });
    }

   
    event.attendees.push(user._id);
    event.registeredCount = event.attendees.length;

    await event.save();

    res.status(200).json({ message: "Registration successful!", event });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};