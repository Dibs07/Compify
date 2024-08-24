import { Request, Response } from "express";
import { model } from "../config/model";

export const generateStudyMaterials = async (req: Request, res: Response) => {
    const { topic, more, text } = req.body;
    let prompt = `Generate me the study materials for topic ${topic} in the form of array of strings. Each string should be long .Do not repeat to give any answer to a particular topic. Optimize it and give the best answer. Don't give any external text except the array.`;
    if (more === true) {
        prompt = `Generate me the study materials for topic ${topic} in the form of array of strings. Each string should be long .Do not repeat to give any answer to a particular topic. Optimize it and give the best answer. Don't give any external text except the array. ${text} . Add more with it differently.`;
    }
    try {
        const response = await model.invoke(prompt);
        return res.status(200).json({ response: response.content });
    } catch (error: any) {
        console.error("Error generating study materials:", error.message);
        return res.status(500).json({ error: "Failed to generate study materials. Please try again." });
    }
};