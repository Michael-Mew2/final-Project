import mongoose from "mongoose";

mongoose.connection.on('error', (error) => {
    console.log('DB Fehler nach initialer Verbindung:', error);
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.DATABASE
        });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

export default connectDB;