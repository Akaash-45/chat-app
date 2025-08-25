import React, { useState, useEffect } from "react";
import { Bot, Sparkles, Copy, CheckCircle } from "lucide-react";
import { extractTime } from "../../utils/extractTime";

const AIMessage = ({ message, isTyping = false }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  // Typewriter effect for AI messages
  useEffect(() => {
    if (message?.message && !isTyping) {
      let i = 0;
      const text = message.message;
      setDisplayedText("");
      setIsAnimating(true);

      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setIsAnimating(false);
        }
      }, 30); // Typing speed

      return () => clearInterval(timer);
    }
  }, [message?.message, isTyping]);

  const handleCopy = async () => {
    if (message?.message) {
      try {
        await navigator.clipboard.writeText(message.message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    }
  };

  if (isTyping) {
    return (
      <div className="chat chat-start animate-slideIn2D">
        <div className="chat-image avatar">
          <div className="w-10 h-10 border-2 border-white/30 flex items-center justify-center bg-black/60">
            <Bot className="w-5 h-5 text-white/70 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse2D"></div>
          </div>
        </div>
        <div className="chat-bubble message-bubble-them max-w-xs lg:max-w-md border-white/30">
          <div className="flex items-center gap-2">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
            <span className="text-xs text-white/60 text-mono">AI_THINKING</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat chat-start animate-slideIn2D">
      {/* AI Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 h-10 border-2 border-white/50 flex items-center justify-center bg-black/80 relative">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse2D"></div>

          {/* AI Icon */}
          <Bot className="w-5 h-5 text-white relative z-10" />

          {/* Corner sparkle */}
          <Sparkles className="absolute top-0.5 right-0.5 w-2 h-2 text-white/60 animate-pulse2D delay-200" />
        </div>
      </div>

      {/* AI Message */}
      <div className="chat-bubble message-bubble-them max-w-xs lg:max-w-md border-white/40 bg-gradient-to-br from-white/10 to-white/5 relative group">
        {/* AI Badge */}
        <div className="absolute -top-2 -left-2 px-2 py-1 bg-black border border-white/30 text-xs text-mono text-white/80">
          <div className="flex items-center gap-1">
            <Bot className="w-3 h-3" />
            <span>AI</span>
          </div>
        </div>

        {/* Message Content */}
        <div className="relative">
          <p className="text-sm text-mono leading-relaxed">
            {displayedText}
            {isAnimating && (
              <span className="inline-block w-2 h-4 bg-white/60 ml-1 animate-pulse"></span>
            )}
          </p>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute -top-2 -right-2 w-6 h-6 border border-white/30 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/10"
            title="Copy message"
          >
            {copied ? (
              <CheckCircle className="w-3 h-3 text-white" />
            ) : (
              <Copy className="w-3 h-3 text-white/70" />
            )}
          </button>
        </div>

        {/* Timestamp */}
        <div className="chat-footer opacity-50 text-xs text-mono mt-2 flex items-center gap-2">
          <span>{message ? extractTime(message.createdAt) : "NOW"}</span>
          <Sparkles className="w-2 h-2 text-white/40" />
          <span>GEMINI_AI</span>
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
