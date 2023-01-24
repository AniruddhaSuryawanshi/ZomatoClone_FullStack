import mongoose from "mongoose";
import dotenv from "dotenv";

export default async () => {
  return mongoose.connect(process.env.MONGO_URL);
};
