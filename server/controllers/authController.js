import { User } from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const { clerkId, email, name, avatar } = req.body;

    let user = await User.findOne({ clerkId });

    if (user) {
      user.avatar = avatar || user.avatar;
      await user.save();
      return res.status(200).json(user);
    }

    
    user = await User.create({
      clerkId,
      name,
      email,
      avatar,
      role: "student", 
      department: "General", 
      points: 0,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Sync Error:", error);
    res.status(500).json({ message: "Server Error syncing user" });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.auth.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};