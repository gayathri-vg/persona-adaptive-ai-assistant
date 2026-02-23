require('dotenv').config();
const axios = require('axios');

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY;

async function getAIResponse(message, userType) {
  const systemPrompts = {
    Senior: "You are assisting a senior shopper. Use simple words, explain clearly, and offer help patiently.",
    Neurodivergent: "You are helping a neurodivergent user. Keep responses structured, literal, and distraction-free.",
    Adult: "You are assisting an adult user. Respond quickly, clearly, and give access to advanced options.",
    Young: "You are helping a young user. Be fun, friendly, and explain in a relatable way.",
    Colourblind: "Do not mention colors. Use positions, shapes, or symbols to describe items.",
    Family: "You are supporting a group/family. Be inclusive, neutral, and explain so all age groups understand.",
  };

  const systemMessage = systemPrompts[userType] || "You are a helpful Walmart shopping assistant.";

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "mistralai/mistral-7b-instruct", // or another OpenRouter model
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",  // required by OpenRouter
          "X-Title": "WASIIS Assistant",        // optional but helpful
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("❌ AI Error:", err.response?.data || err.message);
    return "Sorry, I couldn't get a response from the assistant.";
  }
}

module.exports = { getAIResponse };
