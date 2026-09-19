# 📘 Journal App – Full Stack Application

> **A secure, full-stack personal journaling platform built with Spring Boot and React, featuring JWT authentication, Redis caching, asynchronous Kafka-based sentiment analysis, Gemini API integration, and weekly sentiment email reports.**

---

## 📌 Overview

Journal App is a full-stack personal journaling application that allows users to securely create and manage journal entries.

The application includes:

- JWT-based authentication and authorization
- Role-based access control for `USER` and `ADMIN`
- Journal entry CRUD operations
- Redis caching for external API responses
- Weather API integration
- Google Gemini API-based journal sentiment analysis
- Apache Kafka for asynchronous processing
- Weekly sentiment analysis and email reports
- User-controlled weekly sentiment email toggle
- Admin user management
- Protected routes and automatic handling of expired JWT tokens
- Custom 404 page
- Responsive React UI

The sentiment-analysis workflow was designed so that saving a journal entry is not blocked while Gemini performs the analysis.

---

## 🛠 Tech Stack

### Frontend

- React
- Tailwind CSS
- Framer Motion
- Axios
- React Router

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data MongoDB
- MongoDB
- Redis
- Apache Kafka
- Google Gemini API
- Spring Scheduler
- JavaMail / SMTP

### Development & Infrastructure

- Maven
- Docker Desktop
- Docker Compose
- Apache Kafka + ZooKeeper for local development

---

## 🚀 Features

### 🔐 Authentication & Security

- JWT-based authentication
- Secure login and registration
- Role-based access control (`USER` / `ADMIN`)
- Protected frontend routes
- Separate admin route protection
- Automatic redirect when JWT expires
- Custom `404 Not Found` page
- CORS configuration

### 📝 Journal Management

- Create journal entries
- Edit journal entries
- Delete journal entries
- View complete journal entries
- Pinterest-style masonry dashboard
- Profile activity/calendar
- Journal sentiment displayed on journal cards

### 🤖 AI Sentiment Analysis

Each newly created journal entry is processed asynchronously using Google Gemini API.

The application classifies the journal into one predefined sentiment:

- `HAPPY`
- `SAD`
- `ANGRY`
- `EXCITED`
- `CALM`
- `ANXIOUS`
- `MOTIVATED`
- `TIRED`
- `GRATEFUL`
- `STRESSED`

The sentiment is stored with the journal entry in MongoDB.

### ⚡ Kafka-Based Asynchronous Processing

Kafka is used between journal creation and sentiment analysis.

#### Flow

```text
User writes journal
        ↓
Spring Boot saves journal in MongoDB
        ↓
JournalCreatedEvent is created
        ↓
Kafka Producer publishes event
        ↓
Kafka Topic: journal-created
        ↓
Journal Consumer receives event
        ↓
Gemini API analyzes journal content
        ↓
Sentiment is obtained
        ↓
Journal entry is updated in MongoDB
```

This keeps the journal-saving operation independent from the Gemini API call.

### 📊 Weekly Sentiment

Users can enable or disable weekly sentiment reports from their profile.

When enabled:

1. Journal entries from the previous 7 days are collected.
2. Their stored sentiments are analyzed.
3. The most frequent sentiment is determined for the weekly summary.
4. A weekly email is sent to the user.
5. The user can turn the feature OFF at any time.

The frontend also displays weekly sentiment information and sentiment distribution.

### 📧 Weekly Email Report

A scheduled Spring Boot task checks users who have enabled weekly sentiment reporting.

Example report:

```text
Your weekly sentiment

😊 HAPPY       42%
⚡ EXCITED     28%
😌 CALM        20%
😰 ANXIOUS     10%
```

### 🧑‍💼 Admin Panel

- View users
- Promote users to `ADMIN`
- Delete users
- Refresh Redis cache

### ⚡ Caching & External APIs

- Redis caching integration
- Weather API integration
- Cached external API responses to reduce unnecessary API calls

---

## 🏗 Architecture

### Backend Architecture

```text
React Frontend
      ↓
REST API
      ↓
Controller
      ↓
Service Layer
      ↓
Repository
      ↓
MongoDB
```

For sentiment analysis:

```text
JournalEntryService
      ↓
MongoDB Save
      ↓
Kafka Producer
      ↓
Kafka Topic
      ↓
Kafka Consumer
      ↓
SentimentAnalysisService
      ↓
GeminiService
      ↓
Gemini API
      ↓
MongoDB Journal Update
```

For weekly reports:

```text
Spring Scheduler
      ↓
Find users with weekly sentiment enabled
      ↓
Collect previous 7 days' journal sentiments
      ↓
Calculate sentiment summary
      ↓
EmailService
      ↓
User Email
```

---

## 📂 Project Structure

This project follows a full-stack monorepo structure with a Spring Boot backend and React frontend.

```text
JournalApp/
│
├── 📂 myjournalapp/                         # Spring Boot Backend
│   │
│   ├── src/main/java/com/msd/myjournalapp/
│   │
│   ├── api.response/
│   │   └── WeatherResponse.java
│   │
│   ├── Cache/
│   │   └── AppCache.java
│   │
│   ├── Config/
│   │   ├── CorsConfig.java
│   │   ├── KafkaConfig.java
│   │   ├── KafkaTopics.java
│   │   ├── RedisConfig.java
│   │   └── SpringSecurity.java
│   │
│   ├── Constants/
│   │   └── Placeholders.java
│   │
│   ├── Consumer/
│   │   └── JournalConsumer.java
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
│   ├── Enums/
│   │   └── Sentiment.java
│   │
│   ├── Events/
│   │   └── JournalCreatedEvent.java
│   │
│   ├── Filter/
│   │   └── JwtFilter.java
│   │
│   ├── Producer/
│   │   └── JournalProducer.java
│   │
│   ├── Repositories/
│   │   ├── ConfigJournalAppRepository.java
│   │   ├── JournalEntryRepository.java
│   │   ├── UserRepository.java
│   │   └── UserRepositoryImpl.java
│   │
│   ├── Scheduler/
│   │   └── UserScheduler.java
│   │
│   ├── Services/
│   │   ├── EmailService.java
│   │   ├── GeminiService.java
│   │   ├── JournalEntryServices.java
│   │   ├── RedisService.java
│   │   ├── SentimentAnalysisService.java
│   │   ├── UserDetailServiceImpl.java
│   │   ├── UserServices.java
│   │   └── WeatherService.java
│   │
│   ├── Utils/
│   │   └── JwtUtils.java
│   │
│   └── MyJournalAppApplication.java
│
├── 📂 journalApp-frontend/                  # React Frontend
│   │
│   ├── public/
│   │   └── screenshots/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── adminApi.js
│   │   │   ├── authApi.js
│   │   │   ├── journalApi.js
│   │   │   └── userApi.js
│   │   │
│   │   ├── assets/
│   │   │   └── auth.png
│   │   │
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── EntryCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProfileCalendar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── WeeklySentiment.jsx
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
│   ├── eslint.config.js
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml                       # Local Kafka + ZooKeeper
└── README.md
```

---

## 📸 Application Screenshots

> Add the following screenshots to `journalApp-frontend/public/screenshots/`.

### 🔐 Login Page

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/login.jpg" width="900"/>
</p>
```

### 🔐 Register Page

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/register.jpg" width="900"/>
</p>
```

### 📝 Dashboard

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/Dashboard.jpg" width="900"/>
</p>
```

### 📓 Add Journal

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/AddJournal.jpg" width="900"/>
</p>
```

### 🧠 Journal Sentiment

Show the sentiment directly on each journal card.

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/JournalSentiment.jpg" width="900"/>
</p>
```

### 👤 Profile & Weekly Sentiment

Show the weekly sentiment toggle and weekly sentiment summary.

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/WeeklySentiment.jpg" width="900"/>
</p>
```

### 🧑‍💼 Admin Panel

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/AdminPanel.jpg" width="900"/>
</p>
```

### 📧 Weekly Email

If you want to showcase the email feature, add a screenshot of the received weekly report:

```html
<p align="center">
  <img src="/journalApp-frontend/public/screenshots/WeeklyEmail.jpg" width="900"/>
</p>
```

---

## 🔧 Getting Started

### 📋 Prerequisites

Make sure you have:

- Java 21
- Maven
- Node.js 18+
- MongoDB
- Redis
- Docker Desktop
- Docker Compose
- A Gemini API key
- SMTP/Gmail credentials if using weekly email

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sujalmore29/journal-app.git
cd journal-app
```

---

## 2️⃣ Configure Environment Variables

Do **not** commit API keys, passwords, JWT secrets, or SMTP credentials.

Configure the required environment variables locally, for example:

```text
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_weather_api_key
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_app_password
JWT_SECRET=your_jwt_secret
REDIS_PASSWORD=your_redis_password
```

Your `application.yml` should reference environment variables rather than containing secrets directly.

---

## 3️⃣ Start Kafka Locally

The project uses Docker Compose to run Kafka and ZooKeeper locally.

From the directory containing `docker-compose.yml`:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

You should see the Kafka and ZooKeeper containers running.

To stop them:

```bash
docker compose down
```

Kafka is used locally as the message broker; this setup does not require a paid Kafka cloud service.

---

## 4️⃣ Run the Backend

Navigate to the Spring Boot backend:

```bash
cd myjournalapp
```

Run:

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

## 5️⃣ Run the Frontend

Open another terminal:

```bash
cd journalApp-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🧠 Sentiment Analysis Flow

The application uses Kafka to decouple journal persistence from AI processing.

When a user saves a journal:

```text
1. User submits journal
        ↓
2. Backend validates the request
        ↓
3. Journal is saved to MongoDB
        ↓
4. JournalCreatedEvent is created
        ↓
5. Kafka Producer publishes the event
        ↓
6. Kafka stores the event in journal-created topic
        ↓
7. JournalConsumer receives the event
        ↓
8. GeminiService sends journal content to Gemini API
        ↓
9. Gemini returns one predefined sentiment
        ↓
10. Journal entry is updated with that sentiment
```

### Why Kafka?

Without Kafka, the request could look like:

```text
Save Journal
     ↓
Call Gemini API
     ↓
Wait for Gemini response
     ↓
Save sentiment
     ↓
Return response
```

With Kafka:

```text
Save Journal
     ↓
Publish Event
     ↓
Return / continue processing

Kafka
     ↓
Consumer
     ↓
Gemini API
     ↓
Update sentiment
```

This separates journal creation from sentiment analysis and allows the AI-processing component to operate asynchronously.

---

## 📊 Weekly Sentiment Flow

```text
Spring Scheduler
       ↓
Find users with weeklySentiment = true
       ↓
Read journals from previous 7 days
       ↓
Read stored sentiment values
       ↓
Calculate sentiment distribution
       ↓
Create weekly report
       ↓
Send email using EmailService
```

Users can control this feature from their Profile page using the Weekly Sentiment toggle.

---

## 🧩 Key Backend Components

| Component | Responsibility |
|---|---|
| `JournalEntryServices` | Creates and manages journal entries |
| `JournalProducer` | Publishes journal-created events to Kafka |
| `JournalConsumer` | Consumes journal events |
| `GeminiService` | Communicates with Gemini API |
| `SentimentAnalysisService` | Processes sentiment information |
| `UserScheduler` | Runs weekly sentiment processing |
| `EmailService` | Sends weekly email reports |
| `KafkaTopics` | Stores Kafka topic constants |
| `KafkaConfig` | Kafka-related Spring configuration |
| `RedisService` | Handles Redis caching |
| `JwtFilter` | Processes JWT authentication |
| `SpringSecurity` | Configures application security |

---

## 🎯 Key Learnings

- Implemented JWT authentication and authorization
- Built protected and role-based frontend routes
- Designed a Spring Boot layered architecture
- Worked with MongoDB and Spring Data MongoDB
- Implemented Redis caching
- Integrated an external Weather API
- Integrated Google Gemini API
- Designed asynchronous event-driven processing with Kafka
- Implemented Kafka Producer and Consumer
- Used Spring Scheduler for recurring background tasks
- Implemented automated weekly email reporting
- Built user-controlled feature toggles
- Connected React frontend with Spring Boot REST APIs
- Handled JWT expiry and protected routes
- Built responsive UI using Tailwind CSS and Framer Motion
- Used Docker Compose for local Kafka and ZooKeeper infrastructure

---

## 🔒 Security Notes

Sensitive values should never be committed to GitHub.

Keep the following outside the repository:

- Gemini API key
- Weather API key
- Redis password
- MongoDB credentials
- JWT secret
- Gmail/SMTP password or app password

Use environment variables or a local ignored configuration file.

---

## 👨‍💻 Author

**Sujal More**

- LinkedIn: [Sujal More](https://www.linkedin.com/in/sujal-more-841575249)
- Email: moresujal2912@gmail.com
