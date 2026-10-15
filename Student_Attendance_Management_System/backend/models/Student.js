import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
