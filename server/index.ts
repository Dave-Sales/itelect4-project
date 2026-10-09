import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.js";
import claimRoutes from "./src/routes/claims.js";
import itemRoutes from "./src/routes/items.js";
import userRoutes from "./src/routes/users.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/lostfound";

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Lost & Found API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);

async function startServer() {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to MongoDB successfully.");
    })
    .catch((error) => {
      console.warn("MongoDB connection unavailable. Starting API without database connection.", error);
    });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
