import { ChatFireworks } from "@langchain/community/chat_models/fireworks";


const model = new ChatFireworks({
    apiKey: process.env.FIREWORKS_API_KEY,
    model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    max_tokens: 16384,
    top_p: 1,
    top_k: 40,
    presence_penalty: 0,
    frequency_penalty: 0,
    temperature: 0.6,
});
export const generateStudyMaterials = async (req, res) => {
    const { topic, more, text } = req.body;
    let prompt = `Generate me the study materials for topic ${topic} in the form of array of strings. Each string should be long .Do not repeat to give any answer to a particular topic. Optimize it and give the best answer. Don't give any external text except the array.`;
    if(more === true) {
        prompt = `Generate me the study materials for topic ${topic} in the form of array of strings. Each string should be long .Do not repeat to give any answer to a particular topic. Optimize it and give the best answer. Don't give any external text except the array. ${text} . Add more with it differently.`;
    }
    try {
        const response = await model.invoke(prompt);
        return res.status(200).json({ response: response.content });
    } catch (error) {
        console.error("Error generating study materials:", error.message);
        return res.status(500).json({ error: "Failed to generate study materials. Please try again." });
    }
};