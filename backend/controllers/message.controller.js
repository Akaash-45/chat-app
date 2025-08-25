import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage=async (req, res) => {
    try {
        const {message, encrypted} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        const senderName = req.user.fullName; // Include sender name

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            encrypted: !!encrypted
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);
        
        // Add sender name to the socket message (without saving to DB)
        const messageWithSender = {
            ...newMessage.toObject(),
            senderName
        };
        
        // SOCKET IO functionality will go here
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", messageWithSender);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");

        if (!conversation) {
            // If no conversation found, return empty array
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};