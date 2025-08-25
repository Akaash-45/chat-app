import { useState } from "react";
import toast from "react-hot-toast";

const useAIChat = () => {
  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);

  const sendAIMessage = async (message) => {
    setLoading(true);
    setAiTyping(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      toast.error(error.message);
      console.error("AI Chat Error:", error);
      return null;
    } finally {
      setLoading(false);
      setAiTyping(false);
    }
  };

  const getAIConversation = async () => {
    try {
      const res = await fetch("/api/ai/conversation");
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error("Get AI Conversation Error:", error);
      return null;
    }
  };

  return { loading, aiTyping, sendAIMessage, getAIConversation };
};

export default useAIChat;
