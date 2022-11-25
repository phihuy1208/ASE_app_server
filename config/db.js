import mongoose from "mongoose";

const connectDB = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://mongo:mongo@awproject.ciikl4n.mongodb.net/?retryWrites=true&w=majority",
      connectionParams
    )
    .then(() => console.log("MongoDB connection established."))
    .catch((error) =>
      console.error("MongoDB connection failed:", error.message)
    );
};

export default connectDB;
