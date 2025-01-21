import mongoose from 'mongoose';


const connectDB = async ()=>{
    try {
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/saraha'; 
    await mongoose.connect(dbUri);
    console.log('Database connected successfully');

    }catch(error){
        console.log('Failed to connect the database');
    }
}


export default connectDB;