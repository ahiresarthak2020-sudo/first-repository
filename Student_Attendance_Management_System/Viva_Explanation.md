# Beginner Explanation and Viva Questions

## Explain the project in simple words
"My project is a Student Attendance Management System. It helps a teacher add students and record whether each student is present or absent on a particular date. The frontend is made with React, the backend uses Node.js and Express, and MongoDB stores the data. The frontend communicates with the backend using REST APIs."

## How to explain the parts
- **React:** What the user sees and clicks in the browser.
- **Node.js:** Lets JavaScript run on the server.
- **Express:** Helps create API routes such as GET and POST.
- **MongoDB:** Database that stores documents.
- **Mongoose:** Connects Node.js code to MongoDB and defines document structure.
- **REST API:** A set of URLs and HTTP methods used to send and receive data.
- **GET:** Read data.
- **POST:** Create data or update the attendance status in this project.
- **DELETE:** Remove a record.
- **JSON:** A text format for sending structured data between frontend and backend.
- **CRUD:** Create, Read, Update, Delete.

## Viva questions and easy answers

1. **What is your project?**  
   It is a web application for adding students and recording date-wise attendance.

2. **Why did you choose this project?**  
   Manual attendance can take time. This system keeps student and attendance records organized in a database.

3. **What is full stack development?**  
   It means building both the frontend and backend and connecting them to a database.

4. **What is React used for?**  
   React builds the interactive user interface using components and state.

5. **What is Node.js?**  
   Node.js is a runtime that runs JavaScript outside the browser, including on a server.

6. **What is Express.js?**  
   Express is a Node.js framework used to create server routes and APIs.

7. **Why MongoDB?**  
   It stores data as flexible documents and works well with JavaScript-based applications.

8. **What is Mongoose?**  
   Mongoose is a library that defines schemas and helps Node.js read and write MongoDB documents.

9. **What is a REST API?**  
   It is a way for the frontend to communicate with backend endpoints using HTTP methods.

10. **What is the difference between GET and POST?**  
    GET retrieves data. POST sends data to create or process a record.

11. **What does CRUD mean?**  
    Create, Read, Update, and Delete.

12. **What are the collections in this project?**  
    `students` stores student details and `attendances` stores attendance entries.

13. **Why does attendance have a date field?**  
    So attendance can be recorded and viewed separately for each date.

14. **How do you prevent duplicate attendance?**  
    The database has a unique index on the combination of student ID and date; the API also updates an existing record for that pair.

15. **What is JSON?**  
    JSON is a text format used to exchange structured data between the frontend and backend.

16. **What happens when you add a student?**  
    React sends a POST request. Express validates the values, Mongoose saves the student in MongoDB, and React reloads the student list.

17. **What is validation?**  
    Checking that required data is present and valid before saving it.

18. **What improvements can be made?**  
    Login, teacher/admin roles, attendance percentages, CSV/PDF exports, and online deployment.

## Common errors
- `MongoDB connection failed`: check whether MongoDB is running and check `backend/.env`.
- `Failed to fetch`: ensure backend is running on port 5000.
- `npm: command not found`: install Node.js LTS, then restart the terminal.
- Port already in use: close the old server terminal or change the port.
- No students shown: add a student and check the message area.
