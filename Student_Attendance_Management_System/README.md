# Student Attendance Management System
A beginner-friendly Full Stack Development mini project using React, Node.js, Express, and MongoDB.

## Features
- Add and view students
- Mark attendance as Present or Absent for a selected date
- View attendance records
- Filter records by date
- Dashboard summary of students and attendance for the selected date
- Basic input validation and helpful error messages

## Requirements
- Node.js (LTS)
- npm (installed with Node.js)
- MongoDB Community Server running locally, OR a MongoDB Atlas connection string
- VS Code

## 1. Start MongoDB
### Local MongoDB
Start the MongoDB service on your Mac. If you installed MongoDB with Homebrew, you can usually run:
```bash
brew services start mongodb-community
```
The exact service name may vary by your MongoDB version. Alternatively, use MongoDB Atlas and copy its connection string.

## 2. Start the backend
Open a terminal in VS Code:
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
The backend uses `http://localhost:5000`.
If using MongoDB Atlas, edit `backend/.env` and replace `MONGODB_URI` with your Atlas connection string.

## 3. Start the frontend
Open a SECOND terminal in VS Code:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL Vite prints, usually `http://localhost:5173`.

## 4. Suggested demo
1. Add 2–3 sample students.
2. Select today's date.
3. Mark each student Present or Absent.
4. Change the date and mark attendance again.
5. Use the date filter to view records.
6. Capture screenshots for your report.

## Project structure
```text
Student_Attendance_Management_System/
  backend/
    models/Student.js
    models/Attendance.js
    routes/students.js
    routes/attendance.js
    server.js
    package.json
    .env.example
  frontend/
    src/App.jsx
    src/main.jsx
    src/styles.css
    index.html
    package.json
    vite.config.js
  README.md
  Student_Attendance_Mini_Project_Report.docx
```

## Important
- The report's test status is intentionally marked "To be tested" until you run the app.
- This is an educational mini project, not a production-ready system. It does not include login/roles.
- Do not put real private student data into a public demo.
