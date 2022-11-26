import mongoose from "mongoose";

const connectDB = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.MONGODB_URI, connectionParams)
    .then(() => console.log("MongoDB connection established."))
    .catch((error) =>
      console.error("MongoDB connection failed:", error.message)
    );
};

export default connectDB;
