import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import aiRoutes from "./routes/ai.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

import path from "path";

const __dirname = path.resolve();

// Load environment variables from backend/.env file
dotenv.config({ path: path.join(__dirname, "backend", ".env") });

// Validate required environment variables
if (!process.env.MONGO_DB_URI) {
  console.error("Error: MONGO_DB_URI environment variable is not set");
  console.log(
    "Please create a backend/.env file with your MongoDB connection string",
  );
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse the incoming requests with JSON payload (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
