import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentsRouter from "./routes/students.js";
import attendanceRouter from "./routes/attendance.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", message: "Attendance API is running." }));
app.use("/api/students", studentsRouter);
app.use("/api/attendance", attendanceRouter);

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/student_attendance";

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
  })
  .catch(error => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
