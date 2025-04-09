import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt } from '../prompts/prompts.js';

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
const systemPrompt = getSystemPrompt() || "Default system prompt message.";

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemPrompt,
});


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateResult = async (prompt, retries = 3) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result?.response?.text();
      
      if (!text) {
        throw new Error("Failed to generate response.");
      }

      for (const chunk of text.match(/.{1,50}/g) || []) {
        console.log(chunk);
        await sleep(100);
      }

      return text;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      
      if (error.message.includes("503 Service Unavailable") && attempt < retries - 1) {
        console.log("Retrying in 1 seconds...");
        await sleep(1000); 
      } else {
        throw error;
      }
    }
  }
};
