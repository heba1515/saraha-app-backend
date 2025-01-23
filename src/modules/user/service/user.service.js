import jwt from 'jsonwebtoken';
import UserModel from '../../../DB/models/User.model.js';

export const updateUser = async (req,res)=>{
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(decoded.id,{name:req.body.name},{new:true});
        res.status(200).json({message: 'Welcome', updatedUser})
    }catch(error){
        res.status(500).json({error: error.message});
    }
}