import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    date: { type: String, required: true }, // YYYY-MM-DD
    status: { type: String, enum: ["Present", "Absent"], required: true }
  },
  { timestamps: true }
);

attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
