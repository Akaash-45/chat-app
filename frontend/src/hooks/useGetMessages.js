import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';
import { decryptMessage, generateEncryptionKey, storeEncryptionKey } from '../utils/encryption';
import { useAuthContext } from '../context/AuthContext';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            
            try {
                // Try to load from localStorage first
                const cachedMessages = localStorage.getItem(`chat-messages-${selectedConversation._id}`);
                
                if (cachedMessages) {
                    // Use cached messages immediately to prevent "flash" of no messages
                    setMessages(JSON.parse(cachedMessages));
                }
                
                // Always fetch latest messages from server
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                
                if (data.error) throw new Error(data.error);
                
                // Generate encryption key for this conversation
                const encryptionKey = generateEncryptionKey(
                    authUser._id, 
                    selectedConversation._id
                );
                
                // Store the key for future use
                storeEncryptionKey(selectedConversation._id, encryptionKey);
                
                // Handle decryption of messages if needed
                const processedMessages = await Promise.all(data.map(async (msg) => {
                    if (msg.encrypted) {
                        try {
                            const decryptedMsg = await decryptMessage(msg.message, encryptionKey);
                            return {
                                ...msg,
                                message: decryptedMsg,
                                originalMessage: decryptedMsg
                            };
                        } catch (error) {
                            console.error("Failed to decrypt message:", error);
                            return msg;
                        }
                    }
                    return msg;
                }));
                
                setMessages(processedMessages);
                
                // Update localStorage with latest messages
                localStorage.setItem(
                    `chat-messages-${selectedConversation._id}`, 
                    JSON.stringify(processedMessages)
                );
                
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages, authUser._id]);

    return {messages, loading};
}

export default useGetMessages;
