import React from "react";
import Conversation from "./Conversation";
import AIConversation from "./AIConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = ({ onSelectConversation }) => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col h-full">
      {/* AI Assistant Section */}
      <div className="px-2 mb-4 animate-slideIn2D">
        <div className="px-2 py-1 mb-2">
          <div className="flex items-center justify-between text-xs text-white/60 text-mono">
            <span>AI_ASSISTANT</span>
            <span>[GEMINI]</span>
          </div>
          <div className="w-full h-px bg-white/10 mt-1"></div>
        </div>
        <AIConversation onSelect={onSelectConversation} />
      </div>

      {/* User Conversations Header */}
      <div className="px-4 py-2 mb-2 animate-slideIn2D delay-200">
        <div className="flex items-center justify-between text-xs text-white/60 text-mono">
          <span>USER_CONTACTS</span>
          <span>[{conversations.length}]</span>
        </div>
        <div className="w-full h-px bg-white/10 mt-1"></div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 px-2 space-y-1">
        {conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
            onSelect={onSelectConversation}
          />
        ))}

        {loading && (
          <div className="flex justify-center py-4 animate-pulse2D">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}

        {!loading && conversations.length === 0 && (
          <div className="text-center py-8 text-white/40 text-mono text-sm animate-slideUp2D">
            <div className="w-8 h-8 border border-white/20 mx-auto mb-2"></div>
            NO_USER_CONTACTS_FOUND
            <p className="text-xs text-white/30 mt-2">
              Search for users to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
