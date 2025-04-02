import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed..!", error);
        throw error;
    }
};

export default DatabaseConnection;
