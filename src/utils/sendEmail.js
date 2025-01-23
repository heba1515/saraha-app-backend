import dotenv from 'dotenv';
dotenv.config();

import { emailTemplete } from "./emailTemplete.js";
import nodemailer from ("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});


export default async function sendSarahaEmail(email, url) {
    const info = await transporter.sendMail({
        from: `"Heba Sabri" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Welcome to Saraha App!',
        text: `Welcome to Saraha!`,
        html: emailTemplete(url), 
    });

    console.log("Message sent: %s", info.messageId);
}