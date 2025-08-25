import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "animate-pulse2D" : "";

  return (
    <div
      className={`flex gap-3 mb-6 ${fromMe ? "justify-end" : "justify-start"} animate-slideUp2D`}
    >
      {/* Avatar - Show for other person's messages */}
      {!fromMe && (
        <div className="flex-shrink-0 animate-slideIn2D delay-100">
          <div className="w-8 h-8 border border-white/30 overflow-hidden">
            <img
              src={profilePic}
              alt="avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-white/10"></div>
          </div>
        </div>
      )}

      {/* Message Content */}
      <div
        className={`max-w-xs lg:max-w-md ${fromMe ? "animate-slideIn2D" : "animate-slideIn2D delay-200"}`}
      >
        {/* Message Bubble */}
        <div
          className={`relative p-3 ${shakeClass} ${
            fromMe ? "message-bubble-me" : "message-bubble-them"
          }`}
        >
          {/* Message Text */}
          <p className="text-sm text-mono leading-relaxed break-words">
            {message.message}
          </p>

          {/* Geometric corner accent */}
          <div
            className={`absolute ${fromMe ? "-bottom-1 -right-1" : "-bottom-1 -left-1"} w-2 h-2 ${
              fromMe
                ? "bg-white border border-black"
                : "bg-black border border-white/30"
            }`}
          ></div>
        </div>

        {/* Timestamp */}
        <div
          className={`flex items-center gap-2 mt-1 text-xs text-white/40 text-mono ${
            fromMe ? "justify-end" : "justify-start"
          }`}
        >
          <div className="w-4 h-px bg-white/20"></div>
          <span>{formattedTime}</span>
          {fromMe && <div className="w-2 h-2 border border-white/30"></div>}
        </div>
      </div>

      {/* Avatar - Show for my messages */}
      {fromMe && (
        <div className="flex-shrink-0 animate-slideIn2D delay-100">
          <div className="w-8 h-8 border border-white/50 overflow-hidden">
            <img
              src={profilePic}
              alt="avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-white/20"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
