import * as ai from "../services/ai.service.js";

export const getResult = async (req, res) => {
  try {
    const { prompt } = req.query;
  

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).send({ message: "Missing or invalid prompt." });
    }

    console.log("Received prompt:", prompt);

    const result = await ai.generateResult(prompt);
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
