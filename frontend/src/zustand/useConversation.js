import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useConversation = create(
  persist(
    (set, get) => ({
      selectedConversation: null,
      messages: [],
      setSelectedConversation: (selectedConversation) => {
        set({ selectedConversation });
        
        // Load persisted messages for this conversation if available
        if (selectedConversation) {
          const persistedMessages = localStorage.getItem(`chat-messages-${selectedConversation._id}`);
          if (persistedMessages) {
            set({ messages: JSON.parse(persistedMessages) });
          } else {
            set({ messages: [] });
          }
        } else {
          set({ messages: [] });
        }
      },
      setMessages: (messages) => {
        set({ messages });
        
        // Persist messages in localStorage
        const { selectedConversation } = get();
        if (selectedConversation && messages.length > 0) {
          localStorage.setItem(`chat-messages-${selectedConversation._id}`, JSON.stringify(messages));
        }
      },
      addMessage: (message) => 
        set((state) => {
          const newMessages = [...state.messages, message];
          
          // Persist updated messages
          const { selectedConversation } = get();
          if (selectedConversation) {
            localStorage.setItem(`chat-messages-${selectedConversation._id}`, JSON.stringify(newMessages));
          }
          
          return { messages: newMessages };
        }),
      clearAllMessageHistory: () => {
        // Clear all chat history from localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('chat-messages-')) {
            localStorage.removeItem(key);
          }
        });
        set({ messages: [] });
      },
    }),
    {
      name: 'conversation-storage', // name for the persisted state
      partialize: (state) => ({ selectedConversation: state.selectedConversation }), // only persist selectedConversation
    }
  )
);

export default useConversation;