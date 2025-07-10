import mongoose, { mongo } from "mongoose";

//connect to mongo db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("mongoDB connection error", error.message);
    process.exit(1); //stops the app if db connection gets failed
  }
};

export default connectDB;
