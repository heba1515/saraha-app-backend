import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
