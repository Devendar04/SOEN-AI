import * as template from '../services/template.service.js';
import { basePrompt as nodeBasePrompt } from "../default/node.js";
import { basePrompt as reactBasePrompt } from "../default/react.js";
import { BASE_PROMPT } from '../prompts/prompts.js';


export const generatePrompts = async (inputPrompt) => {
    const result = await template.generateTemplate(inputPrompt);
    const answer = result.trim().toLowerCase(); 

    if (answer === "react") {
        return {
            prompts: [
                BASE_PROMPT,
                `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
            ],
            uiPrompts: [reactBasePrompt],
            userPrompts :inputPrompt,
        };
    } else if (answer === "node") {
        return {
            prompts: [
                `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
            ],
            uiPrompts: [nodeBasePrompt],
            userPrompts :inputPrompt,
        };
    } else {
        throw new Error("Invalid response type");
    }
};


export const getTempalte = async (req, res) => {
    try {
        const { prompt } = req.query;

        if (!prompt) {
            if (res) {
                return res.status(400).json({ error: "Missing 'prompt' query parameter" });
            }
            throw new Error("Missing 'prompt' query parameter");
        }

        const responsePayload = await generatePrompts(prompt);

        // If called as an HTTP route
        if (res) {
            return res.json(responsePayload);
        }

        // If called programmatically
        return responsePayload;
    } catch (error) {
        console.error("Error in getTemplate:", error);

        if (res) {
            return res.status(500).json({ error: "Failed to generate content" });
        }

        throw error;
    }
};
