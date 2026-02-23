const { getAIResponse } = require("./ai_assistant");

async function test() {
  const message = "What are the top deals today in walmart?";
  const userType = "Senior"; // Try other types too

  const response = await getAIResponse(message, userType);
  console.log("✅ Response:", response);
}

test();
