import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // διαβάζει τα αρχεία .env που έχω στην εφαρμογή μου. //default θεση στον root_foler του project. ** {path:'./src/.env'}

const MONGO_URI = process.env.MONGO_URI || "myString"; // διαβάζει το συγκεκριμένο variable που με ενδιαφέρει.

export const connectDB = async() => {
    try{
        // console.log(MONGO_URI); # for .env testing
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    }catch (err) {
        console.log("MongoDB connection error:", err);
        process.exit(1);
    }
}