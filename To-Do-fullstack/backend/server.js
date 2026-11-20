import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import TodoRoute from "./Routes/TodoRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/debug", (req, res) => {
  res.json({ message: "Correct backend is running" });
});
app.use("/api/todos", TodoRoute);
console.log("Todo routes registered at /api/todos");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();