import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateEventDetails = async (req, res) => {
  console.log("--------------------------------");
  console.log("🤖 Gemini Controller Hit");

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ message: "GEMINI_API_KEY missing" });
  }

  const { title, category, mood } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.0-pro" 
    });

    const prompt = `
      Write a short, exciting 2-sentence description for a college event.
      Title: ${title}
      Category: ${category}
      Mood: ${mood || "Exciting"}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ AI Response:", text);

    return res.status(200).json({
      description: text.trim(),
    });

  } catch (error) {
    console.error("❌ GEMINI AI ERROR:", error);
    return res.status(200).json({
      description: `Join us for ${title}! It will be an amazing ${category} event that you don't want to miss. (AI temporarily unavailable)`,
    });
  }
};