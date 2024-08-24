import { Request, Response } from "express";
import { model } from "../config/model";

export const generateExams = async (req: Request, res: Response) => {
    const prompt = `Generate me the list (Only 5) of indian competitive exams in the form of array of strings. Don't give any external text except the array.`;
    try {
        const response = await model.invoke(prompt);
        return res.status(200).json({ response: response.content });
    } catch (error: any) {
        console.error("Error generating exams:", error.message);
        return res.status(500).json({ error: "Failed to generate exams. Please try again." });
    }
};

export const generateSubjects = async (req: Request, res: Response) => {
    const { exam } = req.body;
    const prompt = `Generate me the list of subjects for competitive exam ${exam} in the form of array of strings. Don't give any external text except the array.`;
    try {
        const response = await model.invoke(prompt);
        return res.status(200).json({ response: response.content });
    } catch (error: any) {
        console.error("Error generating subjects:", error.message);
        return res.status(500).json({ error: "Failed to generate subjects. Please try again." });
    }
};

export const generateChapters = async (req: Request, res: Response) => {
    const { exam, subject } = req.body;
    const prompt = `Generate me the list of chapters for subject ${subject} for competitive exam ${exam} in the form of array of strings. Don't give any external text except the array. Do not repeat any chapter.`;
    try {
        const response = await model.invoke(prompt);
        return res.status(200).json({ response: response.content });
    } catch (error: any) {
        console.error("Error generating chapters:", error.message);
        return res.status(500).json({ error: "Failed to generate chapters. Please try again." });
    }
};

export const generateTopics = async (req: Request, res: Response) => {
    const { exam, subject, chapter } = req.body;
    const prompt = `Generate me the list of topics for chapter ${chapter} for subject ${subject} for competitive exam ${exam} in the form of array of strings. Don't give any external text except the array.`;
    try {
        const response = await model.invoke(prompt);
        return res.status(200).json({ response: response.content });
    } catch (error: any) {
        console.error("Error generating topics:", error.message);
        return res.status(500).json({ error: "Failed to generate topics. Please try again." });
    }
};

export const generateQuestions = async (req: Request, res: Response) => {
    const { exam, subject, chapter, medium, numberOfQuestions, pyq } = req.body;
    let prompt = `Generate me the list of 10 ${medium} questions for all chapters for subject ${subject} for competitive exam ${exam} in the form of array of objects with question, options, answer. Try getting ideas from some previous year questions from 2019 to 2024. Don't give any external text except the array.`;

    if (chapter) {
        prompt = `Generate me the list of ${numberOfQuestions ? numberOfQuestions : '10'} hard questions for chapter ${chapter} for subject ${subject} for competitive exam ${exam} in the form of array of objects with question, options, answer. Don't give any external text except the array.`;
    }

    if (pyq) {
        prompt = `Generate me the list of ${numberOfQuestions ? numberOfQuestions : '10'} hard questions for all chapters for subject ${subject} for competitive exam ${exam} in the form of array of objects with question, options, answer. Include Previous Year Questions. Try getting ideas from some previous year questions from 2019 to 2024. Don't give any external text except the array.`;
    }

    try {
        const response = await model.invoke(prompt);

        // Attempting to parse the response as JSON
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(response.content as string);
        } catch (parseerror: any) {
            console.warn("Warning: Failed to parse response as JSON:", parseerror.message);
            parsedResponse = response.content;  // Fallback to raw content
        }

        console.log(parsedResponse);
        return res.status(200).json({ response: parsedResponse });
    } catch (error: any) {
        console.error("Error generating questions:", error.message);
        return res.status(500).json({ error: "Failed to generate questions. Please try again." });
    }
};

export const generateExplanation = async (req: Request, res: Response) => {
    try {
        const { questions } = req.body;
        const questionTexts = questions.map((q: any) => q.question).join("\n");
        const prompt = `Provide explanations for the following questions in the form of an array of strings, with each explanation corresponding to each question. Don't give any external text except the array.\nQuestions:\n${questionTexts}`;
        const response = await model.invoke(prompt);
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(response.content as string);
        } catch (parseerror: any) {
            console.warn("Warning: Failed to parse response as JSON:", parseerror.message);
            parsedResponse = response.content;
        }
        return res.status(200).json({ response: parsedResponse });
    } catch (error: any) {
        console.error("Error generating explanation:", error.message);
        return res.status(500).json({ error: "Failed to generate explanation. Please try again." });
    }
};

