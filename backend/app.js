import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-router.js";
import adminRouter from "./routes/admin-router.js";
import movieRouter from "./routes/movie-router.js";
import bookingsRouter from "./routes/booking-router.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const mongoUri =
  process.env.MONGODB_URI ||
  `mongodb+srv://akash:${process.env.MONGODB_PASSWORD}@cluster0.pkknmce.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "ShowPulse API is running" });
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

if (!mongoUri || mongoUri.includes("undefined")) {
  console.error("MongoDB connection string is missing.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() =>
    app.listen(port, () => {
      console.log(`Connected to database. Server running on port ${port}.`);
    })
  )
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
