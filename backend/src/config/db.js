import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSEDB_URI);
    console.log("MongooseDB connected successfully!");
  } catch (error) {
    console.log("Error connecting to MONGOOSEDB", error);
    process.exit(1);
  }
};
