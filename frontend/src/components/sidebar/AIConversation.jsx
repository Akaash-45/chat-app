import React from "react";
import { Bot, Sparkles, Zap } from "lucide-react";
import useConversation from "../../zustand/useConversation";

const AIConversation = ({ onSelect }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const aiConversation = {
    _id: "ai-assistant",
    fullName: "AI Assistant",
    username: "ai-assistant",
    profilePic: null,
    isAI: true,
  };

  const isSelected = selectedConversation?._id === aiConversation._id;

  const handleSelectAI = () => {
    setSelectedConversation(aiConversation);
    onSelect && onSelect();
  };

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 animate-slideIn2D ${
        isSelected
          ? "bg-white/10 border-white/30"
          : "hover:bg-white/5 border-white/10"
      } border-2 p-4 mb-3 group`}
      onClick={handleSelectAI}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute left-0 top-0 w-1 h-full bg-white animate-pulse2D"></div>
      )}

      <div className="flex items-center">
        {/* AI Avatar */}
        <div className="relative mr-4">
          <div
            className={`w-12 h-12 border-2 ${
              isSelected ? "border-white/50" : "border-white/30"
            } flex items-center justify-center relative overflow-hidden group-hover:border-white/50 transition-all duration-300`}
          >
            {/* Animated background for AI */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse2D"></div>

            {/* AI Icon */}
            <Bot
              className={`w-6 h-6 ${
                isSelected ? "text-white" : "text-white/70"
              } group-hover:text-white transition-colors duration-300 relative z-10`}
            />

            {/* Corner sparkles */}
            <Sparkles className="absolute top-1 right-1 w-3 h-3 text-white/40 animate-pulse2D delay-200" />
          </div>

          {/* Always online indicator for AI */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border-2 border-black animate-pulse2D">
            <Zap className="w-2 h-2 text-black absolute top-0.5 left-0.5" />
          </div>
        </div>

        {/* AI Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3
              className={`font-bold text-mono ${
                isSelected ? "text-white" : "text-white/80"
              } group-hover:text-white transition-colors duration-300`}
            >
              AI_ASSISTANT
            </h3>

            {/* AI Badge */}
            <div className="flex items-center gap-1 px-2 py-1 border border-white/20 bg-white/5">
              <Sparkles className="w-3 h-3 text-white/60" />
              <span className="text-xs text-white/60 text-mono">AI</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-px bg-white animate-pulse2D"></div>
            <span className="text-xs text-white/60 text-mono">
              ALWAYS_AVAILABLE
            </span>
            <Zap className="w-3 h-3 text-white/60 animate-pulse2D delay-300" />
          </div>

          <p className="text-xs text-white/40 text-mono mt-1">
            Ask me anything • Powered by Gemini AI
          </p>
        </div>
      </div>

      {/* Hover effects */}
      <div
        className={`absolute inset-0 pointer-events-none border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 ${
          isSelected ? "border-white/30" : ""
        }`}
      ></div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default AIConversation;
