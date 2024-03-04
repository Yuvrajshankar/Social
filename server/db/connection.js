import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGO-DB CONNECTED');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDatabase;