import { ChatFireworks } from "@langchain/community/chat_models/fireworks";

export const model = new ChatFireworks({
  apiKey: process.env.FIREWORKS_API_KEY ?? "fw_3Zn6v9BZkg8SdB5Q6hS5a4R6",
  model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
  maxTokens: 16384,
  topP: 1,
  temperature: 0.6,
});