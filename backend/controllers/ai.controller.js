import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    // Create a chat session for better context handling
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are an AI assistant in a secure chat application. Be helpful, concise, and engaging. Format your responses in a conversational manner suitable for instant messaging.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hello! I'm your AI assistant. I'm here to help you with questions, have conversations, or assist with various tasks. What would you like to talk about?",
            },
          ],
        },
      ],
    });

    // Send the message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const aiMessage = response.text();

    // Return the AI response in the same format as regular messages
    res.status(200).json({
      _id: `ai-${Date.now()}`,
      senderId: "ai-assistant",
      receiverId: req.user._id,
      message: aiMessage,
      createdAt: new Date(),
      isAI: true,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      error: "Failed to get AI response",
      details: error.message,
    });
  }
};

export const getAIConversation = async (req, res) => {
  try {
    // Return AI assistant as a virtual conversation
    res.status(200).json({
      _id: "ai-assistant",
      fullName: "AI Assistant",
      username: "ai-assistant",
      profilePic: "/api/placeholder/ai-avatar",
      isAI: true,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Get AI Conversation Error:", error);
    res.status(500).json({ error: "Failed to get AI conversation" });
  }
};
