import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import AIMessage from "./AIMessage";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const { selectedConversation } = useConversation();
  const [aiMessages, setAiMessages] = useState([]);
  const [aiTyping, setAiTyping] = useState(false);
  const lastMessageRef = useRef();

  const isAIConversation = selectedConversation?._id === "ai-assistant";

  // Combined effect for scrolling
  useEffect(() => {
    const allMessages = isAIConversation ? aiMessages : messages;
    if (allMessages.length > 0 || aiTyping) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, aiMessages, aiTyping, isAIConversation]);

  // Reset AI messages when switching away from AI conversation
  useEffect(() => {
    if (!isAIConversation) {
      setAiMessages([]);
      setAiTyping(false);
    }
  }, [isAIConversation]);

  // Function to add AI message (will be passed to MessageInput via context)
  const addAIMessage = (message) => {
    setAiMessages((prev) => [...prev, message]);
  };

  const setAITyping = (typing) => {
    setAiTyping(typing);
  };

  // Store AI functions in window for MessageInput to access
  useEffect(() => {
    if (isAIConversation) {
      window.aiMessageHandlers = { addAIMessage, setAITyping };
    }
    return () => {
      if (window.aiMessageHandlers) {
        delete window.aiMessageHandlers;
      }
    };
  }, [isAIConversation]);

  const currentMessages = isAIConversation ? aiMessages : messages;
  const showWelcome = !isAIConversation && !loading && messages.length === 0;
  const showAIWelcome = isAIConversation && aiMessages.length === 0;

  return (
    <div className="px-4 py-4 flex-1 h-full overflow-y-auto">
      {/* Messages Header */}
      {(currentMessages.length > 0 || isAIConversation) && (
        <div className="text-center mb-6 animate-slideUp2D">
          <div className="inline-block px-4 py-2 border border-white/20 bg-black/60 text-xs text-white/60 text-mono">
            {isAIConversation ? "AI_CONVERSATION" : "ENCRYPTED_CONVERSATION"}
          </div>
          <div className="w-24 h-px bg-white/20 mx-auto mt-2"></div>
        </div>
      )}

      {/* AI Welcome Message */}
      {showAIWelcome && (
        <div className="text-center h-full flex items-center justify-center animate-slideUp2D">
          <div className="space-y-4 max-w-md">
            <div className="w-16 h-16 border-2 border-white/20 mx-auto flex items-center justify-center bg-black/40">
              <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
                <div className="w-4 h-4 bg-white animate-pulse2D"></div>
              </div>
            </div>
            <h3 className="text-white text-lg text-mono font-bold">
              AI_ASSISTANT_READY
            </h3>
            <p className="text-white/60 text-sm text-mono">
              Ask me anything! I'm powered by Gemini AI and ready to help with
              questions, conversations, coding help, creative writing, and much
              more.
            </p>
            <div className="text-white/40 text-xs text-mono space-y-1">
              <p>• Real-time responses</p>
              <p>• Context-aware conversations</p>
              <p>• Helpful and engaging</p>
            </div>
            <div className="w-32 h-px bg-white/10 mx-auto"></div>
          </div>
        </div>
      )}

      {/* Regular Messages */}
      {!isAIConversation &&
        !loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : undefined}
            className="animate-slideUp2D"
            style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
          >
            <Message message={message} />
          </div>
        ))}

      {/* AI Messages */}
      {isAIConversation &&
        aiMessages.map((message, index) => (
          <div
            key={message._id || index}
            ref={index === aiMessages.length - 1 ? lastMessageRef : undefined}
            className="mb-4"
          >
            {message.isAI ? (
              <AIMessage message={message} />
            ) : (
              <Message message={message} />
            )}
          </div>
        ))}

      {/* AI Typing Indicator */}
      {aiTyping && (
        <div ref={lastMessageRef}>
          <AIMessage isTyping={true} />
        </div>
      )}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* No Messages Yet */}
      {showWelcome && (
        <div className="text-center h-full flex items-center justify-center animate-slideUp2D">
          <div className="space-y-4">
            <div className="w-16 h-16 border-2 border-white/20 mx-auto flex items-center justify-center">
              <div className="w-8 h-8 border border-white/30"></div>
            </div>
            <p className="text-white/40 text-sm text-mono">NO_MESSAGES_YET</p>
            <p className="text-white/30 text-xs text-mono">
              Send a message to start conversation
            </p>
            <div className="w-32 h-px bg-white/10 mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
