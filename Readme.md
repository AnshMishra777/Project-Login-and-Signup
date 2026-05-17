🚀 LeetCode Tracker

LeetCode Tracker is a full-stack web application that allows users to create an account, log in securely, and analyze LeetCode profiles through a clean and modern dashboard. The platform fetches real-time LeetCode statistics and visualizes problem-solving progress, rankings, badges, and difficulty-wise performance.

This project was built to practice and demonstrate full-stack development skills using React, Tailwind CSS, Node.js, Express, and MongoDB.

🌟 Features
🔐 User Authentication (Signup & Login)
🔑 Secure password hashing using bcrypt
📊 Real-time LeetCode profile analytics
🏆 Global ranking and badge tracking
📈 Easy / Medium / Hard problem breakdown
⚡ Fast API fetching with caching
🎨 Responsive modern UI with dark theme
🔍 Search functionality for LeetCode usernames
🌌 Glassmorphism inspired design
🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
React Router DOM
React Icons
Backend
Node.js
Express.js
MongoDB
Mongoose
bcrypt
📂 Project Overview

The application consists of three major sections:

1️⃣ Authentication System

Users can:

Create a new account
Login securely
Store user information in MongoDB

Passwords are encrypted using bcrypt before being stored in the database.

2️⃣ LeetCode Search Dashboard

After login, users can:

Search any LeetCode username
Fetch live profile data
View detailed coding statistics

The backend communicates with the LeetCode GraphQL API and returns processed data to the frontend.

3️⃣ Analytics & Visualization

The dashboard displays:

Total solved questions
Difficulty-wise progress
Global rank
Reputation
Star rating
Earned badges

Progress bars and cards provide a clean visual representation of user performance.

⚙️ How It Works
Frontend

The frontend is built using React and Tailwind CSS.
Routing is managed using React Router.

Main pages:

Login Page
Signup Page
LeetCode Dashboard

Tailwind CSS is used for styling and responsive design.

Backend

The backend is built using Express.js and MongoDB.
It handles:

Authentication
Database operations
API communication
LeetCode data fetching

The backend also includes:

Password hashing with bcrypt
Error handling
Simple caching mechanism for faster API responses
🍃 Database

MongoDB is used to store user information.

User schema includes:

Name
Email
Password

🔑 API Endpoints
Authentication APIs
Signup
POST /signup
Login
POST /login
LeetCode API
Fetch User Data
GET /api/leetcode/:username

Example:

GET /api/leetcode/Adonisansh_011
🎨 UI Design

The UI focuses on:

Minimal design
Dark mode aesthetics
Smooth user experience
Responsive layout
Interactive cards and progress bars

The application uses gradients, blur effects, and modern card layouts to create a visually appealing dashboard.

📸 Pages Included
🔐 Login Page
📝 Signup Page
🔍 Search Interface
📊 Analytics Dashboard
🚀 Future Improvements

Planned future features:

JWT Authentication
User Profile Customization
Leaderboards
Contest Tracking
Daily Streak Monitoring
Deployment on Vercel/Render
Responsive mobile optimization
👨‍💻 Author
Ansh Ranjan Mishra

Full Stack Developer | NIT Jamshedpur

Connect With Me
GitHub: GitHub Profile
LinkedIn: LinkedIn Profile
Instagram: Instagram Profile
💖 Conclusion

LeetCode Tracker is a practical full-stack project focused on authentication, API integration, database management, and responsive UI development. It demonstrates the integration of frontend and backend technologies to build a real-world developer-focused application.