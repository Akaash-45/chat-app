import React, { useState } from "react";
import { Send, Terminal, Hash, Bot, Sparkles, Lock } from "lucide-react";
import useSendMessage from "../../hooks/useSendMessage";
import useAIChat from "../../hooks/useAIChat";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageInputEnhanced = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { loading: aiLoading, sendAIMessage } = useAIChat();
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const isAIConversation = selectedConversation?._id === "ai-assistant";
  const isLoading = loading || aiLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (isAIConversation) {
      // Handle AI conversation
      const userMessage = {
        _id: `user-${Date.now()}`,
        senderId: authUser._id,
        receiverId: "ai-assistant",
        message: message,
        createdAt: new Date(),
        isAI: false,
      };

      // Add user message to AI chat
      if (window.aiMessageHandlers) {
        window.aiMessageHandlers.addAIMessage(userMessage);
        window.aiMessageHandlers.setAITyping(true);
      }

      setMessage("");

      // Get AI response
      const aiResponse = await sendAIMessage(message);

      if (window.aiMessageHandlers) {
        window.aiMessageHandlers.setAITyping(false);
        if (aiResponse) {
          window.aiMessageHandlers.addAIMessage(aiResponse);
        }
      }
    } else {
      // Handle regular user conversation
      await sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-black/80 border-t border-white/10 animate-slideUp2D">
      {/* Input Header */}
      <div className="flex items-center gap-2 mb-3 text-xs text-white/40 text-mono">
        {isAIConversation ? (
          <>
            <Bot className="w-4 h-4" />
            <span>AI_INPUT</span>
            <div className="flex-1 h-px bg-white/10"></div>
            <Sparkles className="w-3 h-3" />
            <span>GEMINI_AI</span>
          </>
        ) : (
          <>
            <Terminal className="w-4 h-4" />
            <span>MESSAGE_INPUT</span>
            <div className="flex-1 h-px bg-white/10"></div>
            <Lock className="w-3 h-3" />
            <span>ENCRYPTED</span>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Message Input Container */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-2d w-full resize-none text-sm text-mono min-h-[44px] max-h-32"
            placeholder={
              isAIConversation ? "Ask AI anything..." : "Type message..."
            }
            disabled={isLoading}
            rows="1"
          />

          {/* Character Counter */}
          <div className="absolute bottom-2 right-3 text-xs text-white/30 text-mono">
            {message.length}/500
          </div>

          {/* Input Enhancement Indicators */}
          <div className="absolute top-2 right-3 flex items-center gap-1">
            {isAIConversation && (
              <div className="flex items-center gap-1 px-2 py-1 bg-black/60 border border-white/20 text-xs text-mono">
                <Bot className="w-3 h-3 text-white/60" />
                <span className="text-white/60">AI</span>
              </div>
            )}
            {!isAIConversation && (
              <div className="flex items-center gap-1 px-2 py-1 bg-black/60 border border-white/20 text-xs text-mono">
                <Lock className="w-3 h-3 text-white/60" />
                <span className="text-white/60">E2E</span>
              </div>
            )}
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`relative w-12 h-12 border-2 transition-all duration-300 group ${
            isLoading || !message.trim()
              ? "border-white/20 text-white/30 cursor-not-allowed"
              : isAIConversation
                ? "border-white/50 text-white hover:bg-white hover:text-black"
                : "border-white/50 text-white hover:bg-white hover:text-black"
          }`}
        >
          {isLoading ? (
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <>
              {isAIConversation ? (
                <Bot className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              )}
              {message.trim() && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white animate-pulse2D"></div>
              )}
            </>
          )}
        </button>
      </form>

      {/* Bottom Status Line */}
      <div className="flex items-center justify-between text-xs text-white/30 text-mono mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white/30 animate-pulse2D"></div>
          <span>{isAIConversation ? "AI_READY" : "READY"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PRESS ENTER TO SEND</span>
          <div className="w-2 h-2 border border-white/30"></div>
        </div>
      </div>

      {/* AI Typing Status */}
      {isAIConversation && aiLoading && (
        <div className="flex items-center gap-2 mt-2 text-xs text-white/50 text-mono">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
          <span>AI_THINKING</span>
        </div>
      )}
    </div>
  );
};

export default MessageInputEnhanced;
