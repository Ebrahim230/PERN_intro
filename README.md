This is a beginner-friendly PERN stack project that includes complete user authentication — Register, Login, JWT Auth, and Logout functionality. It’s designed as a solid starting point to build production-ready web apps using PostgreSQL, Express.js, React, and Node.js.

✅ Features

🔐 User Registration & Login (JWT Authentication)

🛡 Password encryption using bcrypt

🍪 Token stored securely in HttpOnly Cookies

🧠 Protected routes (Backend + Frontend)

🌐 CORS enabled for secure API requests

🚀 Modern React with hooks

🛠 Tech Stack
Layer	Technology
Frontend	React + Fetch/Axios + Context API
Backend	Node.js + Express.js
Database	PostgreSQL
Auth	JWT + Bcrypt
Deployment Ready	Environment variables support

⚙️ Setup & Installation
1️⃣ Clone the repo
git clone https://github.com/Ebrahim230/PERN_intro.git
cd PERN_intro

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT = 8000
DB_HOST = localhost
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = your_db_password
DB_NAME = your_db_name
JWT_SECRET = your_jwt_secret_key


Run backend:

npm run dev

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev

Database Setup

Run this SQL to create users table:

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);