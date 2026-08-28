import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dns from "node:dns";
import route from "./routes/userRoute.js"
import cors from 'cors'

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });


  app.use("/api",route)