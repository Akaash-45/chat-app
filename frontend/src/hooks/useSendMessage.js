import React, { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { encryptMessage, generateEncryptionKey, storeEncryptionKey } from '../utils/encryption';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    const { authUser } = useAuthContext();

    const sendMessage = async (message) =>{
        setLoading(true);
        try {
            // Generate encryption key based on user IDs
            const encryptionKey = generateEncryptionKey(
                authUser._id, 
                selectedConversation._id
            );
            
            // Store the key for this conversation
            storeEncryptionKey(selectedConversation._id, encryptionKey);
            
            // Encrypt the message
            const encryptedMessage = await encryptMessage(message, encryptionKey);
            
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: encryptedMessage, encrypted: true })
            });
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            
            // Store original message for display but keep encrypted flag
            const messageToStore = {
                ...data,
                message: message, // Use unencrypted message for display
                originalMessage: message,
                encryptedInTransit: true
            };
            
            setMessages([...messages, messageToStore]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {sendMessage,loading};
}

export default useSendMessage
