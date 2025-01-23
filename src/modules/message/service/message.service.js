import MessageModel from '../../../DB/models/Message.model.js';
import UserModel from '../../../DB/models/User.model.js';


export const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;

        const receiver = await UserModel.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        const newMessage = new MessageModel({
            receiverId,
            content,
        });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const getMessagesForUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const messages = await MessageModel.find({ receiverId: userId }).sort({ createdAt: -1 });
        res.status(200).json({ message: 'Messages retrieved successfully', data: messages });
    } catch (error) {
        res.status(500).json({error: error.message });
    }
};


export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;

        const message = await MessageModel.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        if (message.receiverId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this message' });
        }

        await MessageModel.findByIdAndDelete(messageId);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
