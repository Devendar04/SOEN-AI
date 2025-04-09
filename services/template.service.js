import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" ,
  systemInstruction : "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
});

export const generateTemplate = async (prompt) => {
    const result = await model.generateContent(prompt);

    return result.response.text();
}
