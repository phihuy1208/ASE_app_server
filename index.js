import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import groupsRouter from "./groups/groups.router.js";
import cors from "cors";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/groups", groupsRouter);
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
