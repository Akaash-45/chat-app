import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx, emoji, onSelect }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleSelect = () => {
    setSelectedConversation(conversation);
    onSelect && onSelect();
  };

  return (
    <div
      className={`animate-slideIn2D delay-${Math.min(500 + lastIdx * 100, 1000)}`}
    >
      <div
        className={`group relative p-3 cursor-pointer transition-all duration-300 border-l-2 glass-hover
          ${
            isSelected
              ? "bg-white/10 border-l-white"
              : "bg-transparent border-l-transparent hover:bg-white/5 hover:border-l-white/30"
          }`}
        onClick={handleSelect}
      >
        {/* Background Pattern for Selected */}
        {isSelected && (
          <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none"></div>
        )}

        <div className="flex items-center gap-3 relative z-10">
          {/* Avatar with geometric frame */}
          <div className="relative">
            <div
              className={`w-10 h-10 border-2 overflow-hidden relative ${
                isSelected ? "border-white" : "border-white/30"
              }`}
            >
              <img
                src={conversation.profilePic}
                alt={conversation.fullName}
                className="w-full h-full object-cover"
              />
              {/* Geometric overlay */}
              <div className="absolute inset-0 border border-white/10"></div>
            </div>

            {/* Online Status - Geometric Indicator */}
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border-2 border-black animate-pulse2D"></div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3
                className={`font-bold text-sm text-mono truncate transition-colors duration-300 ${
                  isSelected
                    ? "text-white"
                    : "text-white/80 group-hover:text-white"
                }`}
              >
                {conversation.fullName.toUpperCase()}
              </h3>
              <span className="text-lg ml-2 opacity-60">{emoji}</span>
            </div>

            {/* Status Line */}
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`w-2 h-px transition-colors duration-300 ${
                  isOnline ? "bg-white" : "bg-white/30"
                }`}
              ></div>
              <span className="text-xs text-white/50 text-mono">
                {isOnline ? "ONLINE" : "OFFLINE"}
              </span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
          </div>
        </div>

        {/* Hover Effect Lines */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Separator */}
      {!lastIdx && <div className="mx-4 h-px bg-white/5"></div>}
    </div>
  );
};

export default Conversation;
