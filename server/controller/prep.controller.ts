import { Request, Response } from "express";
import { model } from "../config/model";
import * as jwt from 'jsonwebtoken';
import { db } from "../config/db";

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
    const { exam, subject, chapters, medium, numberOfQuestions, pyq, time } = req.body;
    const user: any = req.user;
    if (!user)
        return res.status(401).json({ message: 'User do not exists' });
    if (!Array.isArray(chapters) || chapters.length === 0) {
        return res.status(400).json({ error: "Chapters should be a non-empty array." });
    }

    let responses = [];

    for (const chapter of chapters) {
        let prompt = `Generate me the list of ${numberOfQuestions ? numberOfQuestions : '10'} hard questions for chapter ${chapter} for subject ${subject} for competitive exam ${exam} in the form of array of objects with question, options, answer (It should be in full option , not as option index). Don't give any external text except the array.`;

        if (pyq) {
            prompt = `Generate me the list of ${numberOfQuestions ? numberOfQuestions : '10'} hard questions for chapter ${chapter} for subject ${subject} for competitive exam ${exam} in the form of array of objects with question, options, answer (It should be in full option , not as option index). Include Previous Year Questions. Try getting ideas from some previous year questions from 2019 to 2024. Don't give any external text except the array.`;
        }

        try {
            const response = await model.invoke(prompt);

            let parsedResponse;
            try {
                parsedResponse = JSON.parse(response.content as string);
            } catch (parseerror: any) {
                console.warn(`Warning: Failed to parse response as JSON for chapter ${chapter}:`, parseerror.message);
                parsedResponse = response.content;  // Fallback to raw content
            }

            const total_time = Number(numberOfQuestions) * Number(time);
            const payload = {
                userId: user.id,
                time: total_time,
                no_q: numberOfQuestions
            };
            const verification_secret = process.env.EXAM_TOKEN_SECRET;
            const verificationToken = jwt.sign(payload, verification_secret as string);

            responses.push({ chapter, questions: parsedResponse });
            return res.status(200).json({ responses, verificationToken });
        } catch (error: any) {
            console.error(`Error generating questions for chapter ${chapter}:`, error.message);
            return res.status(500).json({ error: `Failed to generate questions for chapter ${chapter}. Please try again.` });
        }
    }


};


export const generateExplanation = async (req: Request, res: Response) => {
    try {
        const { answers, exam, subject, chapters } = req.body;
        const user: any = req.user;
        const prompt = `Check the userAnswer against the correct answer for each question provided in the following data. Generate an array of objects where each object contains the original question, options, correct answer, userAnswer, and a detailed explanation for each question. 
The final output should be in the following format:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "answer": "string",
    "userAnswer": "string",
    "explanation": "string"
  },
  ...
]
Provide a separate "verdict" string summarizing the candidate's performance, focusing on areas within the subject "${subject}" or chapters "${chapters}" where the candidate needs improvement for the exam "${exam}".
Do not provide unexpected whitespace in between.
IMPORTANT: Do not include any external text or explanations. Only return the array of objects and the "verdict" string.

Questions with user answers:
${JSON.stringify(answers)}`;

        const response = await model.invoke(prompt);
        let responseContent = response.content as string;

        const jsonArrayString = responseContent.substring(
            responseContent.indexOf('['),
            responseContent.lastIndexOf(']') + 1
        );
        const verdictString = responseContent.substring(
            responseContent.lastIndexOf(']') + 1
        ).trim().replace(/^"verdict":/, '').trim();

        let parsedResponse;

        const explainedAswer = JSON.parse(jsonArrayString);
        try {
            parsedResponse = {
                responses: explainedAswer,
                verdict: verdictString
            };
            // console.log(parsedResponse);
        } catch (parseError: any) {
            console.warn("Warning: Failed to parse response as JSON:", parseError.message);
            parsedResponse = response.content;
        }

        const prepData = await db.prep.create({
            data: {
                userId: user.id,
                content: explainedAswer
            }
        });

        console.log(prepData);

        return res.status(200).json({ response: parsedResponse });
    } catch (error: any) {
        console.error("Error generating explanation:", error.message);
        return res.status(500).json({ error: "Failed to generate explanation. Please try again." });
    }
};

export const getHistory = async (req: Request, res: Response) => {
    try {
        const user: any = req.user;
        const history = await db.prep.findMany({
            where: {
                userId: user.id
            },
        });

        return res.status(200).json({
            history
        });
    } catch (error) {
        console.log('[GET_HISTORY_ERROR]', error);
    }
}



