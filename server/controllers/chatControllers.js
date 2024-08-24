import { ChatFireworks } from "@langchain/community/chat_models/fireworks";

// Mock in-memory storage for chat histories
const chatHistories = {};

// Function to generate a unique session ID (e.g., based on user ID or session token)
const getSessionId = (req) => req.headers['session-id'] || 'default-session';

const llm = new ChatFireworks({
  apiKey: process.env.FIREWORKS_API_KEY,
  model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
  temperature: 0.6,
  max_tokens: 16384,
  top_p: 1,
  top_k: 40,
  presence_penalty: 0,
  frequency_penalty: 0,
  maxRetries: 2,
});

export const generateChatting = async (req, res) => {
  const { text } = req.body;
  const sessionId = getSessionId(req);
  
  // Initialize chat history for this session if it doesn't exist
  if (!chatHistories[sessionId]) {
    chatHistories[sessionId] = [
      ["system", "You are an emotional supportive friend to a student, who will understand each and every feeling of student and make him feel motivated and also talk with him/her just like a normal friend ."],
    ];
  }

  // Add the new human message to the chat history
  chatHistories[sessionId].push(["human", text]);

  // Invoke the model with the updated chat history
  try {
    const response = await llm.invoke(chatHistories[sessionId]);

    // Add the AI response to the chat history
    chatHistories[sessionId].push(["assistant", response.content]);

    return res.status(200).json({ response: response.content });
  } catch (error) {
    console.error("Error generating chatting:", error.message);
    return res.status(500).json({ error: "Failed to generate chatting. Please try again." });
  }
};
