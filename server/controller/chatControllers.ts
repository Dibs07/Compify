import { Request, Response } from "express";
import { model } from "../config/model";


type ChatMessage = [role: "system" | "human" | "assistant", content: string];

interface ChatHistories {
  [sessionId: string]: ChatMessage[];
}

const chatHistories: ChatHistories = {};

const getSessionId = (req: Request): string => req.headers['session-id'] as string || 'default-session';

export const generateChatting = async (req: Request, res: Response): Promise<Response> => {
  const { text } = req.body as { text: string };
  const sessionId = getSessionId(req);

  if (!chatHistories[sessionId]) {
    chatHistories[sessionId] = [
      ["system", "You are an emotional supportive friend to a student, who will understand each and every feeling of student and make him feel motivated and also talk with him/her just like a normal friend."],
    ];
  }

  chatHistories[sessionId].push(["human", text]);

  try {
    const response:any = await model.invoke(chatHistories[sessionId]);

    chatHistories[sessionId].push(["assistant", response.content]);

    return res.status(200).json({ response: response.content });
  } catch (error: any) {
    console.error("Error generating chatting:", error.message);
    return res.status(500).json({ error: "Failed to generate chatting. Please try again." });
  }
};
