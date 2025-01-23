import express from 'express';
import { updateUser } from './service/user.service.js';

const router = express.Router();


router.put('/', updateUser);


export default router;