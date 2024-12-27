import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt, BASE_PROMPT, CONTINUE_PROMPT } from '../prompts/prompts.js';

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" ,
  systemInstruction : {getSystemPrompt,BASE_PROMPT,CONTINUE_PROMPT},
});



export const generateResult = async (prompt)=> {
  try {
    const result = await model.generateContent(prompt);

    // Simulate streaming the response
    const text = result.response.text();
    for (const chunk of text.match(/.{1,50}/g)) { // Splits response into 50-char chunks
      console.log(chunk);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Simulates delay
    }
    return result.response.text();
    
  } catch (error) {
    console.error("Error in main:", error);
  }

}
