# 📘 Journal App – Full Stack Application

> **A secure, full-stack personal journaling platform built with Spring Boot and React, featuring JWT authentication and a responsive UI.**

---
<h2>📌 Overview</h2>

### Journal App is a production-style full stack web application that allows users to securely create and manage personal journal entries.The system includes authentication, role-based access control, caching optimization, and an admin management panel.

---
<h2>🛠 Tech Stack</h2>

<h3>Frontend</h3>

- React
- Tailwind CSS
- Axios
- React Router

<h3>Backend</h3>

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- MongoDB
- Redis (Caching)

---
<h2>🚀 Features</h2>

<h3>🔐 Authentication & Security</h3>

- JWT-based authentication
- Role-based access (USER / ADMIN)
- Protected frontend routes
- Automatic logout on token expiry
- 404 route handling

<h3>📝 Journal Management</h3>

- Create, edit, delete journal entries
- Pinterest-style masonry dashboard
- Profile page with activity tracking

<h3>🧑‍💼 Admin Panel</h3>

- Promote users to ADMIN
- Delete users
- Refresh Redis cache

<h3>⚡ Performance</h3>

- Redis caching integration
- Weather API integration with cache 
- optimization

---
<h2>📸 Application Screenshots</h2>

<h3>🔐 Login Page</h3>
<p align="center">
    <img src="/journalApp-frontend/public/screenshots/login.jpg" width="900"/>
</p>

<h3>🔐 Register Page</h3>
<p align="center">
    <img src="/journalApp-frontend/public/screenshots/register.jpg" width="900"/>
</p>

<h3>📝 Dashboard</h3>
<p align="center">
    <img src="/journalApp-frontend/public/screenshots/Dashboard.jpg" width="900"/>
</p>

<h3>📓 Add Journal</h3>
<p align="center">
    <img src="/journalApp-frontend/public/screenshots/AddJournal.jpg" width="900"/>
</p>

<h3>👤 Profile Page</h3>
<p align="center">
    <img src="/journalApp-frontend/public/screenshots/Profile.jpg" width="900"/>
</p>

<h3>🧑‍💼 Admin Panel</h3>
<p align="center">
    <img src="/journalApp-frontend/public/screenshots/AdminPanel.jpg" width="900"/>
</p>

---
<h2>🏗 Architecture<h2>

<h3>Backend follows:</h3>

- Controller → Service → Repository pattern
- JWT filter integrated with Spring Security
- MongoDB for data persistence
- Redis for caching external API responses

<h3>Frontend includes:</h3>

- ProtectedRoute & AdminRoute
- Axios interceptors for token handling
- Modern responsive UI

---
<h2>Project Structure</h2>

### This project follows a full-stack architecture with a Spring Boot backend and a React frontend, organized in a monorepo structure.

```
JournalApp/
│
├── 📂 backend/  (Spring Boot - com.msd.myjournalapp)
│   │
│   ├── api.response/
│   │   └── WeatherResponse.java
│   │
│   ├── Cache/
│   │   └── AppCache.java
│   │
│   ├── Config/
│   │   ├── CorsConfig.java
│   │   ├── RedisConfig.java
│   │   └── SpringSecurity.java
│   │
│   ├── Constants/
│   │   └── Placeholders.java
│   │
│   ├── Controllers/
│   │   ├── AdminController.java
│   │   ├── JournalEntryController.java
│   │   ├── PublicController.java
│   │   └── UserController.java
│   │
│   ├── Entities/
│   │   ├── ConfigJournalAppEntities.java
│   │   ├── JournalEntry.java
│   │   └── User.java
│   │
│   ├── Filter/
│   │   └── JwtFilter.java
│   │
│   ├── Repositories/
│   │   ├── ConfigJournalAppRepository.java
│   │   ├── JournalEntryRepository.java
│   │   └── UserRepository.java
│   │
│   ├── Services/
│   │   ├── EmailService.java
│   │   ├── JournalEntryServices.java
│   │   ├── RedisService.java
│   │   ├── UserDetailServiceImpl.java
│   │   ├── UserServices.java
│   │   └── WeatherService.java
│   │
│   ├── Utils/
│   │   └── JwtUtils.java
│   │
│   └── MyJournalAppApplication.java
│
│
├── 📂 frontend/  (React - journalApp-frontend)
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   ├── adminApi.js
│   │   │   ├── authApi.js
│   │   │   ├── journalApi.js
│   │   │   └── userApi.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── EntryCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProfileCalendar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── CreateEntry.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditEntry.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ViewEntry.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── auth.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   └── eslint.config.js
│
└── README.md
```
---
<h2>Getting Started</h2>

<h2>📋 Prerequisites</h3>

Make sure you have installed:
- Java 17+
- Maven
- Node.js (v18+ recommended)
- MongoDB (running locally or Atlas)
- Redis (if using caching)

<h2>🔧 Backend Setup (Spring Boot)</h2>

### Clone the repository
- git clone https://github.com/Sujalmore29/journal-app.git

### Navigate to backend folder
- cd myjournalapp

### Run Spring Boot application
- mvn spring-boot:run

### Backend will start on:
- http://localhost:8080


<h2>🎨 Frontend Setup (React)</h2>

### Navigate to frontend folder
- cd ../frontend

### Install dependencies
- npm install

### Start development server
- npm run dev

### Frontend will run on:
- http://localhost:5173

---
<h2>🧠 Key Learnings</h2>

- Implemented secure JWT authentication
- Designed role-based authorization
- Integrated Redis caching
- Managed token expiry using Axios interceptors
- Built scalable full-stack architecture

---
<h2>👨‍💻 Author</h2>

- Sujal More
- LinkedIn:<a href="www.linkedin.com/in/sujal-more-841575249">Sujal More</a>
- Email: moresujal2912@gmail.com