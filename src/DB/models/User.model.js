import mongoose from 'mongoose';


const roleType = {
    User: 'User',
    Admin: 'Admin'
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
    phone: {
        type: String, 
    },
    image: {
        type: String, 
        default: 'uploads/profile.png'
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(roleType),
        default: roleType.User
    },
}, { timestamps: true });



const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
