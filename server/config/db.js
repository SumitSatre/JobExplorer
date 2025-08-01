import mongoose from "mongoose";

const mongodb_connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected!');
        
    } catch (error) { 
        console.log('error: ', error);
    }
};

export default mongodb_connect;