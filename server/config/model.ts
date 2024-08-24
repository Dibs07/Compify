import { ChatFireworks } from "@langchain/community/chat_models/fireworks";

export const model = new ChatFireworks({
    apiKey: process.env.FIREWORKS_API_KEY,
    model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    maxTokens: 16384,
    topP: 1,                
    temperature: 0.6,
  });