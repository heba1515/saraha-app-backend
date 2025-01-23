import bcrypt from 'bcryptjs';
import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';
import UserModel from '../../../DB/models/User.model.js';

export const register = async (req, res) => {
    try{
        const { name, email, password, confirmedPassword, phone } = req.body;

        if(password != confirmedPassword){
            return res.status(422).json({message: 'Password and confirmed password must be the same'})
        }

        if(await UserModel.findOne({email})){
            return res.status(409).json({message: 'Email already exist, login instead'})
        }

        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

        const encryptedPhone = crypto.AES.encrypt(phone, process.env.PHONE_SECRET_KEY).toString();

        const newUser = new UserModel({ 
            name, 
            email, 
            password: hashedPassword, 
            phone: encryptedPhone,
            image: req.file.filename 
        });

        await newUser.save();

        const token = jwt.sign({email}, process.env.CONFIRMEMAIL_SECRET_KEY);
        const url = `http://localhost:${process.env.PORT}/auth/verify/${token}`;

        sendSarahaEmail(email, url);

        res.status(201).json({ message: 'User registered successfully!', newUser});
    }catch(error){
        res.status(500).json({ error: error.message});
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const matchedPassword = bcrypt.compareSync(password, user.password);
        if (!matchedPassword) return res.status(401).json({ message: 'Invalid Password' });

        const token = jwt.sign({id: user._id, isLoggedIn: true}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1d'})

        res.status(200).json({ message: 'logged in successfully!', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const verify = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token,process.env.CONFIRMEMAIL_SECRET_KEY);
        const user = await UserModel.findOne({email: decoded.email});
        if(!user) return res.status(404).json({ message: 'Email not found' });
        await UserModel.findByIdAndUpdate(user._id, {confirmEmail: true}, {new: true});
        res.status(200).json({ message: 'Updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};