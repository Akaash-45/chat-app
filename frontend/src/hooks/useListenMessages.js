import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';
import { decryptMessage, generateEncryptionKey, getEncryptionKey } from '../utils/encryption';
import { useAuthContext } from '../context/AuthContext';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const handleNewMessage = async (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      
      // Only update messages if they belong to the current selected conversation
      if (selectedConversation?._id === newMessage.senderId || 
          selectedConversation?._id === newMessage.receiverId) {
        
        // Get encryption key for this conversation
        let key = getEncryptionKey(newMessage.senderId);
        if (!key) {
          // If key not found, generate it
          key = generateEncryptionKey(authUser._id, newMessage.senderId);
        }
        
        // Decrypt the message if it's encrypted
        let decryptedMessage = newMessage.message;
        try {
          if (newMessage.encrypted) {
            decryptedMessage = await decryptMessage(newMessage.message, key);
          }
        } catch (error) {
          console.error("Failed to decrypt message:", error);
        }
        
        // Use functional update to ensure we're working with the latest state
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            ...newMessage, 
            message: decryptedMessage,
            originalMessage: decryptedMessage,
            shouldShake: true 
          }
        ]);
      }
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, selectedConversation, authUser]); // Removed 'messages' from dependencies

  return {};
};

export default useListenMessages;