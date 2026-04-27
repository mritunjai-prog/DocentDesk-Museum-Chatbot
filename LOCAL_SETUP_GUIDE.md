# 🚀 DocentDesk - Complete Local Development Setup Guide

## ✅ Current Status

**Backend**: ✅ Running on `http://localhost:5000`  
**Frontend**: ✅ Running on `http://localhost:8080`  
**Database**: ✅ Supabase PostgreSQL (configured)

---

## 📋 Prerequisites (Already Installed)

- Node.js v18+ ✅
- npm ✅
- Git ✅

## 🏃 Quick Start (60 seconds)

### Terminal 1 - Backend

```bash
cd "d:\DocentDesk - AI Chatbot\backend"
npm install  # If not already done
npm start
# Expected output: "🚀 Server running in development mode on port 5000"
```

### Terminal 2 - Frontend

```bash
cd "d:\DocentDesk - AI Chatbot"
npm install  # If not already done
npm run dev
# Expected output: "➜  Local:   http://localhost:8080/"
```

Then open **`http://localhost:8080`** in your browser.

---

## 🛠️ Project Structure

```
DocentDesk - AI Chatbot/
├── backend/                          # Express.js REST API
│   ├── config/
│   │   ├── supabase.js              # Supabase client
│   │   └── passport.js              # Google OAuth
│   ├── controllers/                  # Business logic (8 modules)
│   ├── routes/                       # API endpoints (7 modules)
│   ├── middleware/                   # Auth & error handling
│   ├── models/                       # Data models
│   ├── server.js                     # Express app entry point
│   ├── package.json                  # Dependencies
│   └── .env                          # Environment config
│
├── src/                              # React + TypeScript source
│   ├── components/                   # React components
│   ├── pages/                        # Page components
│   ├── contexts/                     # State management
│   ├── hooks/                        # Custom hooks
│   └── App.tsx                       # Main app component
│
├── public/                           # Static assets
├── dist/                             # Built frontend (generated)
├── package.json                      # Frontend dependencies
├── vite.config.ts                    # Vite config
└── vercel.json                       # Vercel deployment config
```

---

## 🔐 Environment Configuration

### Backend (.env file already configured)

**Required for local development:**

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:8080

# Supabase (ALREADY CONFIGURED ✅)
SUPABASE_URL=https://tcalunwjzjqjwrrkuedg.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...

# JWT (ALREADY CONFIGURED ✅)
JWT_SECRET=xYN57velBwtE2yoPpzOL1u3a...
```

**Optional features:**

- Google OAuth ✅ (configured)
- OpenAI Chatbot ⚠️ (requires valid API key)
- Email notifications ⚠️ (requires valid email config)

---

## 🔗 API Endpoints (Backend)

### Health Check

```bash
GET http://localhost:5000/
# Returns API documentation
```

### Key APIs

**Authentication:**

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Google OAuth

**Core Features:**

- `GET /api/artifacts` - List museum artifacts
- `GET /api/events` - List events
- `POST /api/bookings` - Book event tickets
- `POST /api/chat/message` - AI chatbot

See `backend/README.md` for complete API documentation.

---

## 🧪 Testing the Project

### Test Backend API

```bash
# 1. Check if backend is running
curl http://localhost:5000/

# 2. Check environment
curl http://localhost:5000/api/debug/env
```

### Test Frontend

```bash
# Access in browser
http://localhost:8080

# Should see:
# - Museum platform UI
# - No CORS errors in console
# - Backend connection working
```

---

## ⚠️ Common Issues & Fixes

### Issue: CORS Error in Browser Console

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Fix**: Ensure backend is running on port 5000 AND frontend CLIENT_URL is `http://localhost:8080`

### Issue: Backend won't start

```
Error: listen EADDRINUSE :::5000
```

**Fix**: Port 5000 is already in use. Stop other processes or change PORT in `.env`

```bash
# Kill process using port 5000
# Windows:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### Issue: Supabase connection fails

```
Error: Supabase configuration is missing
```

**Fix**: Check `.env` file has valid SUPABASE_URL and SUPABASE_SERVICE_KEY

### Issue: Frontend loads but no data appears

```
Check browser console (F12) for errors
```

**Fix**:

1. Verify backend is running: `http://localhost:5000/`
2. Check API calls in browser Network tab
3. Check `.env` CLIENT_URL matches frontend URL

---

## 📦 Dependencies Overview

### Backend (Node.js)

- **Express.js** - Web framework
- **Supabase** - Database & Auth
- **JWT** - Authentication tokens
- **Passport** - OAuth strategy
- **OpenAI** - AI chatbot
- **Nodemailer** - Email notifications
- **Sharp** - Image processing
- **QRCode** - Ticket generation

### Frontend (React)

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **React Three Fiber** - 3D graphics
- **React Query** - Data fetching
- **Supabase JS** - Database client

---

## 🚀 Build for Production

### Frontend Build

```bash
cd "d:\DocentDesk - AI Chatbot"
npm run build
# Creates: dist/ folder
```

### Backend

No build needed - runs directly with Node.js

---

## 📝 Development Workflow

### Making Changes

**Backend:**

1. Edit files in `backend/`
2. Restart with `npm start`
3. Test API endpoints

**Frontend:**

1. Edit files in `src/`
2. Auto-reload in browser
3. Check console for errors

### Running Tests

```bash
# Lint code (optional)
npm run lint
```

---

## 🔑 Important Notes

### Database

- Using **Supabase PostgreSQL** (cloud database)
- No local database setup needed
- Tables are auto-created on first run
- Credentials are in `.env`

### Authentication

- JWT tokens for API
- Google OAuth for social login
- Session management for cookies

### File Uploads

- Images stored in memory/Supabase storage
- Max file size: 5MB (configurable)

---

## 🐛 Debugging

### View Backend Logs

The terminal running `npm start` shows all logs:

```
✅ Supabase client initialized
🔍 Environment loaded
📝 SUPABASE_URL loaded: YES
🚀 Server running on port 5000
```

### Check Environment Variables

```bash
curl http://localhost:5000/api/debug/env
```

### Database Connection Test

```bash
curl http://localhost:5000/
# Should return API documentation
```

---

## 📞 Quick Commands Reference

```bash
# Backend
cd backend && npm install              # Install dependencies
npm start                              # Start server (port 5000)
npm run dev                            # Start with nodemon (auto-restart)
npm run seed                           # Seed database

# Frontend
npm install                            # Install dependencies
npm run dev                            # Start dev server (port 8080)
npm run build                          # Build for production
npm run preview                        # Preview production build
npm run lint                           # Check code style
```

---

## ✨ Next Steps

1. **Test Locally** - Open http://localhost:8080 in browser
2. **Create Account** - Test authentication
3. **Explore APIs** - Try different endpoints
4. **Check Logs** - Monitor both terminals for any errors
5. **Review Code** - Explore project structure

---

## 🆘 Need Help?

- Check `backend/README.md` - API documentation
- Check `backend/QUICK_START.md` - Backend setup
- Check browser console (F12) - Frontend errors
- Check terminal output - Backend errors

**Status**: ✅ Project is ready for local development!
