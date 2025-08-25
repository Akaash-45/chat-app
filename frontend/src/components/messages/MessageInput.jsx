import React, { useState } from "react";
import { Send, Terminal, Hash } from "lucide-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="p-4 bg-black/80 border-t border-white/10 animate-slideUp2D">
      {/* Input Header */}
      <div className="flex items-center gap-2 mb-3 text-xs text-white/40 text-mono">
        <Terminal className="w-4 h-4" />
        <span>MESSAGE_INPUT</span>
        <div className="flex-1 h-px bg-white/10"></div>
        <Hash className="w-3 h-3" />
        <span>ENCRYPTED</span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Message Input Container */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="input-2d w-full resize-none text-sm text-mono min-h-[44px] max-h-32"
            placeholder="Type message..."
            disabled={loading}
            rows="1"
          />

          {/* Character Counter */}
          <div className="absolute bottom-2 right-3 text-xs text-white/30 text-mono">
            {message.length}/500
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={`relative w-12 h-12 border-2 transition-all duration-300 group ${
            loading || !message.trim()
              ? "border-white/20 text-white/30 cursor-not-allowed"
              : "border-white/50 text-white hover:bg-white hover:text-black"
          }`}
        >
          {loading ? (
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <>
              <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
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
          <span>READY</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PRESS ENTER TO SEND</span>
          <div className="w-2 h-2 border border-white/30"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
