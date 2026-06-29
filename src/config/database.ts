import mongoose from "mongoose";
import { env } from "./env";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Data base connected successfully");
  } catch (error) {
    console.log("MongoDB connection error :", error);
    process.exit(1);
  }
};
