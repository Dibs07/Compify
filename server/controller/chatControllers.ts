import { Request, Response } from "express";
import { model } from "../config/model";

// Type for a single chat message
type ChatMessage = [role: "system" | "human" | "assistant", content: string];

// Type for chat history
interface ChatHistories {
  [sessionId: string]: ChatMessage[];
}

// Mock in-memory storage for chat histories
const chatHistories: ChatHistories = {};

// Function to generate a unique session ID (e.g., based on user ID or session token)
const getSessionId = (req: Request): string => req.headers['session-id'] as string || 'default-session';

export const generateChatting = async (req: Request, res: Response): Promise<Response> => {
  const { text } = req.body as { text: string };
  const sessionId = getSessionId(req);

  // Initialize chat history for this session if it doesn't exist
  if (!chatHistories[sessionId]) {
    chatHistories[sessionId] = [
      ["system", "You are an emotional supportive friend to a student, who will understand each and every feeling of student and make him feel motivated and also talk with him/her just like a normal friend."],
    ];
  }

  // Add the new human message to the chat history
  chatHistories[sessionId].push(["human", text]);

  // Invoke the model with the updated chat history
  try {
    const response:any = await model.invoke(chatHistories[sessionId]);

    // Add the AI response to the chat history
    chatHistories[sessionId].push(["assistant", response.content]);

    return res.status(200).json({ response: response.content });
  } catch (error: any) {
    console.error("Error generating chatting:", error.message);
    return res.status(500).json({ error: "Failed to generate chatting. Please try again." });
  }
};
