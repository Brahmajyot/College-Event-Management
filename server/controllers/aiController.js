import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEventDetails = async (req, res) => {
  const { title, category, mood } = req.body;

  if (!title || !category) {
    return res.status(400).json({ message: "Title and Category are required" });
  }

  try {
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    
    const prompt = `
      You are an event management assistant.
      Write a compelling, professional, yet exciting 2-sentence description for a college event.
      
      Details:
      - Event Title: "${title}"
      - Category: ${category}
      - Mood: ${mood || "Energetic"}
      - Target Audience: University Students
      
      Output only the description text. Do not add quotes or labels.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();


    res.status(200).json({
      success: true,
      description: text.trim(),
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      message: "Failed to generate AI content",
      error: error.message 
    });
  }
};