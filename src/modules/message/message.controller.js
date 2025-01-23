import express from 'express';
import {sendMessage, getMessagesForUser, deleteMessage,} from './service/message.service.js';
import verifyToken from '../../utils/verifyToken.js';

const router = express.Router();

router.post('/', sendMessage);

router.get('/:userId', verifyToken, getMessagesForUser);

router.delete('/:messageId', verifyToken, deleteMessage);

export default router;
