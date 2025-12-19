# 🚀 DocentDesk Backend - Quick Start Guide

This guide will get your backend up and running in **5 minutes**.

## Prerequisites Check

✅ Node.js v18+ installed: `node --version`  
✅ MongoDB installed or Atlas account ready  
✅ Git installed (optional)

## Step-by-Step Setup

### 1. Navigate to Backend Directory

```bash
cd "d:\DocentDesk - AI Chatbot\backend"
```

### 2. Install Dependencies

```bash
npm install
```

This will install ~20 packages (Express, MongoDB, Passport, OpenAI, etc.)

### 3. Configure Environment

Copy the example environment file:

```bash
# Windows CMD
copy .env.example .env

# Windows PowerShell
Copy-Item .env.example .env

# Git Bash / Linux / Mac
cp .env.example .env
```

### 4. Edit .env File

Open `.env` in any text editor and update:

**Required (Minimum to run):**

```env
# MongoDB - Use local or Atlas
MONGO_URI=mongodb://localhost:27017/docentdesk

# JWT Secret - Generate random string
JWT_SECRET=change_this_to_random_64_character_string

# Session Secret
SESSION_SECRET=another_random_string_here

# Client URL (your React frontend)
CLIENT_URL=http://localhost:5173
```

**Optional (For full features):**

```env
# Google OAuth (for social login)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_secret_here

# OpenAI (for AI chatbot)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Email (for notifications)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

> **💡 Tip**: You can run the backend without Google OAuth, OpenAI, and Email. These features just won't work until configured.

### 5. Start MongoDB

#### Option A: Local MongoDB

```bash
# Windows
net start MongoDB

# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud - Free)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create cluster → Get connection string
4. Update `MONGO_URI` in `.env` with your Atlas connection string

### 6. Seed Database (Optional but Recommended)

Populate with 12 Egyptian artifacts, 6 events, and sample users:

```bash
npm run seed
```

✅ This creates an admin user:

- Email: `admin@docentdesk.com`
- Password: `admin123456`

### 7. Start the Server

```bash
npm run dev
```

You should see:

```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
```

### 8. Test the API

Open browser or use curl:

```bash
# Health check
http://localhost:5000/health

# Get all artifacts
http://localhost:5000/api/artifacts

# Get featured artifacts
http://localhost:5000/api/artifacts/featured
```

## ✅ You're Done!

Your backend is now running on **http://localhost:5000**

## Next Steps

### Test Authentication

**Register a new user:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"password123\",\"firstName\":\"Test\",\"lastName\":\"User\"}"
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@docentdesk.com\",\"password\":\"admin123456\"}"
```

Copy the `token` from response and use it in Authorization header.

### Connect Frontend

Update your React frontend to use this backend:

```javascript
// src/api/client.js
const API_BASE_URL = "http://localhost:5000/api";
```

See [Backend README.md](README.md) for complete API documentation.

## Common Issues

### Port 5000 Already in Use

Change port in `.env`:

```env
PORT=5001
```

### MongoDB Connection Failed

- Verify MongoDB is running
- Check connection string in `.env`
- For Atlas: Whitelist your IP address

### Module Import Error

Make sure `package.json` has:

```json
"type": "module"
```

### Cannot Find Module

Run:

```bash
npm install
```

## Quick Commands Reference

| Command        | Description                             |
| -------------- | --------------------------------------- |
| `npm install`  | Install dependencies                    |
| `npm run dev`  | Start development server (auto-restart) |
| `npm start`    | Start production server                 |
| `npm run seed` | Populate database with sample data      |

## Environment Variables Quick Reference

| Variable               | Required | Default     | Description                |
| ---------------------- | -------- | ----------- | -------------------------- |
| `NODE_ENV`             | No       | development | Environment mode           |
| `PORT`                 | No       | 5000        | Server port                |
| `MONGO_URI`            | **Yes**  | -           | MongoDB connection string  |
| `JWT_SECRET`           | **Yes**  | -           | Secret for JWT tokens      |
| `CLIENT_URL`           | **Yes**  | -           | Frontend URL for CORS      |
| `GOOGLE_CLIENT_ID`     | No       | -           | Google OAuth client ID     |
| `GOOGLE_CLIENT_SECRET` | No       | -           | Google OAuth secret        |
| `OPENAI_API_KEY`       | No       | -           | OpenAI API key for chatbot |
| `EMAIL_USER`           | No       | -           | SMTP email address         |
| `EMAIL_PASSWORD`       | No       | -           | SMTP password/app password |

## API Endpoints Overview

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- GET `/api/auth/google` - Google OAuth login

### Artifacts

- GET `/api/artifacts` - List artifacts (paginated)
- GET `/api/artifacts/featured` - Featured artifacts
- GET `/api/artifacts/:id` - Single artifact
- POST `/api/artifacts` - Create artifact (admin)

### Events

- GET `/api/events` - List events
- GET `/api/events/featured` - Featured events
- GET `/api/events/:id` - Single event
- POST `/api/events` - Create event (admin)

### Bookings

- POST `/api/bookings` - Create booking (generates QR)
- GET `/api/bookings/my-bookings` - User's bookings
- PUT `/api/bookings/:id/cancel` - Cancel booking

### Users

- GET `/api/users/me` - User profile
- PUT `/api/users/me` - Update profile
- GET `/api/users/me/collection` - Saved artifacts
- POST `/api/users/me/collection/:artifactId` - Save artifact

### Tours & Chat

- POST `/api/tours` - Start virtual tour
- POST `/api/chat/message` - Send message to AI docent

Full API documentation: [README.md](README.md)

## Need Help?

1. Check [README.md](README.md) for detailed documentation
2. Review `.env.example` for all configuration options
3. Check console output for error messages
4. Verify all services (MongoDB, etc.) are running

---

**Happy Coding! 🎨🏛️**
