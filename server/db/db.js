import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

async function db() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default db;