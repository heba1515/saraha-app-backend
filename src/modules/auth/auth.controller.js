import express from 'express';
import multer from 'multer';
import { register, login, verify } from './service/auth.service.js';
import { validation } from '../../utils/validation.js';
import { loginValidationSchema, registerValidationSchema } from './auth.validation.js';

const router = express.Router();

const diskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        const ext = file.mimetype.split('/')[1];
        const filename = `user-${Date.now()}.${ext}`;
        cb(null, filename);
    }
})
const upload = multer({storage: diskStorage, fileFilter: function(req, file, cb){
    const isImage = file.mimetype.split('/')[0];
    if(isImage == 'image'){
        return cb(null, true);
    }else{
        return cb({error:'file must be an image'},false);
    }
}});


router.post('/register', validation(registerValidationSchema), upload.single('image'), register);

router.post('/login', validation(loginValidationSchema), login);

router.get('/verify/:token', verify);


export default router;
