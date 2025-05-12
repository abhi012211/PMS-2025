import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected" + process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default dbConnect;
