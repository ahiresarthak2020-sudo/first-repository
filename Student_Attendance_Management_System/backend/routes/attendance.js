import express from "express";
import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

const router = express.Router();

// GET /api/attendance?date=YYYY-MM-DD
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.date) filter.date = req.query.date;
    const records = await Attendance.find(filter)
      .populate("student", "rollNumber name className")
      .sort({ date: -1 });
    res.json(records);
  } catch {
    res.status(500).json({ message: "Could not fetch attendance." });
  }
});

// POST /api/attendance - create or update a student's status for a date
router.post("/", async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    if (!studentId || !/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !["Present", "Absent"].includes(status)) {
      return res.status(400).json({ message: "Choose a student, valid date, and Present or Absent status." });
    }
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found." });

    const record = await Attendance.findOneAndUpdate(
      { student: studentId, date },
      { student: studentId, date, status },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).populate("student", "rollNumber name className");
    res.status(200).json(record);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Attendance already exists for this student and date." });
    res.status(400).json({ message: "Could not save attendance. Check the input." });
  }
});

// DELETE /api/attendance/:id
router.delete("/:id", async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Attendance record not found." });
    res.json({ message: "Attendance record deleted." });
  } catch {
    res.status(400).json({ message: "Invalid attendance ID." });
  }
});

export default router;
