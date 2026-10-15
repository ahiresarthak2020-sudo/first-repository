import express from "express";
import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// GET /api/students - list all students
router.get("/", async (_req, res) => {
  try {
    const students = await Student.find().sort({ rollNumber: 1 });
    res.json(students);
  } catch {
    res.status(500).json({ message: "Could not fetch students." });
  }
});

// POST /api/students - add a student
router.post("/", async (req, res) => {
  try {
    const { rollNumber, name, className } = req.body;
    if (![rollNumber, name, className].every(v => typeof v === "string" && v.trim())) {
      return res.status(400).json({ message: "Roll number, name, and class are required." });
    }
    const student = await Student.create({
      rollNumber: rollNumber.trim(),
      name: name.trim(),
      className: className.trim()
    });
    res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "That roll number already exists." });
    res.status(500).json({ message: "Could not add student." });
  }
});

// DELETE /api/students/:id - delete a student and their attendance
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found." });
    await Attendance.deleteMany({ student: student._id });
    res.json({ message: "Student and their attendance records deleted." });
  } catch {
    res.status(400).json({ message: "Invalid student ID." });
  }
});

export default router;
