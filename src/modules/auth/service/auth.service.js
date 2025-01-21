import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto-js';
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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to Saraha App!',
            text: `Hello ${name}, welcome to Saraha!`,
        };

        await transporter.sendMail(mailOptions);


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

        res.status(200).json({ message: 'logged in successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
