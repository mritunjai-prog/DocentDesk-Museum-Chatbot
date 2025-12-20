# 🏛️ DocentDesk - AI Museum Companion

<div align="center">

![DocentDesk Banner](https://img.shields.io/badge/DocentDesk-Museum%20AI%20Platform-gold?style=for-the-badge)

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://docent-desk-ai-chatbot.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

**Your AI-powered museum companion offering 3D virtual tours, intelligent chatbot assistance, event bookings, and multilingual support. Experience culture reimagined.**

---

[🚀 Live Demo](https://docent-desk-ai-chatbot.vercel.app) • [✨ Features](#-features) • [📖 Quick Start](#-quick-start) • [🏗️ Architecture](#️-architecture) • [🤝 Contributing](#-contributing)

</div>

---

## 🎯 What is DocentDesk?

DocentDesk transforms museum experiences by combining cutting-edge AI, 3D visualization, and serverless architecture into a comprehensive platform for cultural institutions. Whether you're exploring ancient Egyptian artifacts, booking museum events, or chatting with an AI docent, DocentDesk provides an immersive, accessible, and intelligent gateway to art and history.

### 🌟 Why DocentDesk?

- 🎨 **Premium 3D Experience** - Stunning museum-themed interface with rotating cubes, floating particles, and animated gradients
- 🔐 **Enterprise-Ready Auth** - Google OAuth + JWT authentication with Supabase PostgreSQL backend
- 🌍 **Global Accessibility** - Full i18n support for 8 languages with RTL layouts
- 🎫 **Complete Event System** - Book exhibitions, workshops, and special events with QR tickets
- 🤖 **AI-Powered Guidance** - Intelligent chatbot with voice input/output in multiple languages
- ⚡ **Serverless Architecture** - Deployed on Vercel with instant global scaling
- 📱 **Progressive Web App** - Installable, offline-capable, mobile-optimized

---

## ✨ Features

### 🎨 Premium User Interface

<table>
<tr>
<td width="50%">

**3D Animated Loading Screen**

- Rotating museum cube with gold gradients
- 20 floating particles with random animations
- Animated progress bar with shine effects
- Orbiting elements and grid backgrounds
- Deep blue museum theme matching brand

</td>
<td width="50%">

**Responsive Design**

- Mobile-first architecture
- Adaptive layouts for all screen sizes
- Touch-optimized interactions
- Smooth animations and transitions
- Dark/Light theme with system detection

</td>
</tr>
</table>

### 🔐 Authentication & Security

- **Google OAuth 2.0** - One-click sign in with Google accounts
- **Email/Password** - Traditional authentication with bcrypt hashing
- **JWT Tokens** - Secure session management with 30-day expiration
- **Supabase PostgreSQL** - Enterprise-grade database with row-level security
- **Password Reset** - Email-based recovery with secure token validation
- **Protected Routes** - Client-side route guards for authenticated pages

### 🌍 Internationalization (i18n)

| Language | Code | RTL Support | Voice |
| -------- | ---- | ----------- | ----- |
| English  | `en` | ❌          | ✅    |
| Spanish  | `es` | ❌          | ✅    |
| French   | `fr` | ❌          | ✅    |
| German   | `de` | ❌          | ✅    |
| Italian  | `it` | ❌          | ✅    |
| Chinese  | `zh` | ❌          | ✅    |
| Arabic   | `ar` | ✅          | ✅    |
| Hindi    | `hi` | ❌          | ✅    |

### 🎫 Event Management & Booking

- **Event Types** - Exhibitions, Workshops, Lectures, Symposiums, Special Events
- **5-Step Booking Wizard**
  1. Select tickets and quantity
  2. Enter visitor details
  3. Choose add-ons (audio guides, VIP tours)
  4. Payment information
  5. Confirmation with QR code
- **Real-time Availability** - Live seat counting and capacity management
- **Digital Tickets** - Unique QR codes for contactless entry
- **Booking History** - View past and upcoming events in dashboard

### 🏛️ Artifact Gallery

- **12 Egyptian Artifacts** - Curated collection including:
  - Bust of Nefertiti
  - Rosetta Stone
  - Tutankhamun's Mask
  - Book of the Dead
  - Canopic Jars
  - And 7 more historical treasures
- **3D Card Effects** - Animated cards with hover interactions
- **Category Filtering** - Art, Sculpture, History, Pottery, Artifacts
- **Detailed Modals** - Full descriptions, era, origin, high-res images
- **Image Optimization** - Lazy loading with fallback gradients

### 🤖 AI Chatbot Assistant

- **Natural Language** - Conversational interface for artifact questions
- **Voice Input** - Speech-to-text in all supported languages
- **Voice Output** - Text-to-speech responses with natural synthesis
- **Context Awareness** - Remembers conversation history
- **Artifact Recognition** - Identifies and provides information on exhibits
- **Tour Guidance** - Suggests personalized museum routes

### 👤 User Dashboard

<table>
<tr>
<td width="50%">

**My Collection**

- Save favorite artifacts
- Personal notes and bookmarks
- Share collections with friends
- Export to PDF

</td>
<td width="50%">

**My Tickets**

- View upcoming events
- Download QR codes
- Cancel/modify bookings
- Booking history

</td>
</tr>
<tr>
<td width="50%">

**Tour History**

- Completed virtual tours
- Time spent per exhibit
- Achievement badges
- Progress tracking

</td>
<td width="50%">

**Settings**

- Profile management
- Language preferences
- Notification settings
- Privacy controls

</td>
</tr>
</table>

### 🎮 3D Virtual Tours

- **First-Person Navigation** - WASD + mouse controls
- **WebGL/Three.js** - Hardware-accelerated 3D graphics
- **Interactive Hotspots** - Click artifacts for information
- **Museum Rooms** - Multiple exhibit halls to explore
- **Ambient Audio** - Background museum sounds
- **Performance Optimized** - 60 FPS on modern devices

### ♿ Accessibility (WCAG 2.1 AA)

- ✅ Keyboard navigation for all features
- ✅ Screen reader support with ARIA labels
- ✅ High contrast mode
- ✅ Focus indicators on interactive elements
- ✅ Skip navigation links
- ✅ Semantic HTML structure
- ✅ Alt text for all images
- ✅ Adjustable font sizes

### 📱 Progressive Web App (PWA)

- 📥 **Installable** - Add to home screen on mobile/desktop
- 🔌 **Offline Mode** - Service worker caching
- 🔔 **Push Notifications** - Event reminders (optional)
- 📊 **App-like Experience** - Full-screen, no browser chrome
- ⚡ **Fast Loading** - Instant subsequent visits

---

## 🛠️ Tech Stack

### Frontend Architecture

<div align="center">

| Layer           | Technologies                                                |
| --------------- | ----------------------------------------------------------- |
| **Framework**   | React 18.3, TypeScript 5.8, Vite 5.4.21                     |
| **Styling**     | Tailwind CSS 3.4, shadcn/ui components, Radix UI primitives |
| **Animation**   | Framer Motion 11.x, 3D CSS transforms, GSAP                 |
| **3D Graphics** | Three.js, React Three Fiber, @react-three/drei              |
| **State**       | TanStack Query (React Query 5.x), Context API               |
| **Routing**     | React Router DOM 6.30                                       |
| **Forms**       | React Hook Form, Zod validation                             |
| **i18n**        | react-i18next 15.1, i18next 24.2                            |
| **Icons**       | Lucide React (1000+ icons)                                  |
| **Date/Time**   | date-fns 4.1                                                |
| **Build**       | Vite with SWC, ESBuild                                      |

</div>

### Backend Architecture

<div align="center">

| Layer              | Technologies                                  |
| ------------------ | --------------------------------------------- |
| **Runtime**        | Node.js 18+ with ES Modules                   |
| **Framework**      | Express 4.18, Serverless architecture         |
| **Database**       | Supabase PostgreSQL (v15)                     |
| **Authentication** | Passport.js (Google OAuth 2.0), JWT, bcryptjs |
| **API Design**     | RESTful, async/await patterns                 |
| **Security**       | CORS, Helmet.js, Rate limiting                |
| **Email**          | Nodemailer with SendGrid                      |
| **Validation**     | Express-validator                             |
| **Logging**        | Winston (structured logs)                     |
| **Deployment**     | Vercel Serverless Functions                   |

</div>

### Database Schema (Supabase PostgreSQL)

```sql
-- Users table (authentication)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),  -- bcrypt hashed
  google_id VARCHAR(255) UNIQUE,  -- for OAuth
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Artifacts table
CREATE TABLE artifacts (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  era VARCHAR(100),
  origin VARCHAR(100),
  category VARCHAR(50),
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP,
  location VARCHAR(255),
  capacity INTEGER,
  price DECIMAL(10,2),
  type VARCHAR(50),
  image_url TEXT
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  tickets INTEGER,
  qr_code TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tours table
CREATE TABLE tours (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  artifacts_visited INTEGER[],
  duration INTEGER,  -- seconds
  completed_at TIMESTAMP DEFAULT NOW()
);

-- Feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel CDN Edge                       │
│  ┌────────────────────┐      ┌─────────────────────┐   │
│  │  Frontend (SPA)    │      │  Backend API        │   │
│  │  - React 18        │      │  - Express.js       │   │
│  │  - Vite Build      │      │  - Serverless       │   │
│  │  - Service Worker  │      │  - JWT Auth         │   │
│  └────────────────────┘      └─────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                 │                        │
                 ▼                        ▼
        ┌─────────────────┐      ┌─────────────────┐
        │  Google OAuth   │      │   Supabase      │
        │  - Sign In      │      │   PostgreSQL    │
        │  - User Profile │      │   - Users       │
        └─────────────────┘      │   - Events      │
                                 │   - Bookings    │
                                 └─────────────────┘
```

### Key Dependencies

**Frontend (`package.json`)**

```json
{
  "@radix-ui/react-*": "^1.1.0",
  "@tanstack/react-query": "^5.x",
  "framer-motion": "^11.x",
  "i18next": "^24.2.0",
  "react": "^18.3.1",
  "react-hook-form": "^7.54.0",
  "react-router-dom": "^6.30.0",
  "tailwindcss": "^3.4.0",
  "three": "^0.170.0",
  "zod": "^3.24.1"
}
```

**Backend (`backend/package.json`)**

```json
{
  "@supabase/supabase-js": "^2.89.0",
  "bcryptjs": "^2.4.3",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "nodemailer": "^6.9.0"
}
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- ✅ **npm** 9.x or higher (included with Node.js)
- ✅ **Git** ([Download](https://git-scm.com/))
- ✅ **Supabase Account** ([Sign up free](https://supabase.com))
- ✅ **Google Cloud Console Account** (for OAuth) ([Setup](https://console.cloud.google.com))

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot.git
cd DocentDesk-Museum-Chatbot
```

#### 2️⃣ Install Frontend Dependencies

```bash
# Install root dependencies
npm install

# Verify installation
npm list react react-dom framer-motion
```

#### 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

#### 4️⃣ Configure Environment Variables

**Frontend `.env`** (root directory):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key

# Backend API URL
VITE_BACKEND_URL=http://localhost:5000

# Optional: OpenAI for chatbot
VITE_OPENAI_API_KEY=your_openai_key
```

**Backend `backend/.env`**:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:8080

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Session Secret
SESSION_SECRET=your_session_secret_here

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@docentdesk.com
FROM_NAME=DocentDesk
```

#### 5️⃣ Set Up Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  google_id VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);
```

#### 6️⃣ Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://your-backend.vercel.app/api/auth/google/callback` (production)
6. Copy Client ID and Client Secret to `backend/.env`

#### 7️⃣ Start Development Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Backend running on http://localhost:5000
```

**Terminal 2 - Frontend:**

```bash
npm run dev
# Frontend running on http://localhost:8080
```

#### 8️⃣ Open Your Browser

Navigate to **http://localhost:8080** and you're ready! 🎉

### Quick Test Checklist

- ✅ Homepage loads with 3D animated loading screen
- ✅ Click "Sign In" → Test Google OAuth
- ✅ Create account with email/password
- ✅ Browse artifacts in "Exhibits"
- ✅ Check "Events" page for bookings
- ✅ Open chatbot in bottom-right corner
- ✅ Switch languages in navigation
- ✅ Toggle dark/light theme

---

## 📖 Usage Guide

### Authentication

**Register with Email:**

```typescript
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Login with Google:**

```typescript
// Frontend redirects to:
GET http://localhost:5000/api/auth/google

// User authorizes → redirects back with JWT token
```

**Access Protected Routes:**

```typescript
GET http://localhost:5000/api/users/me
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

#### Authentication Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login with email/password
- `GET /google` - Initiate Google OAuth flow
- `GET /google/callback` - OAuth callback handler
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:token` - Reset password with token
- `PUT /update-password` - Change password (authenticated)

#### User Routes (`/api/users`)

- `GET /me` - Get current user profile
- `PUT /me` - Update profile
- `DELETE /me` - Delete account

#### Artifact Routes (`/api/artifacts`)

- `GET /` - List all artifacts
- `GET /featured` - Get featured artifacts
- `GET /:id` - Get single artifact

#### Event Routes (`/api/events`)

- `GET /` - List all events
- `GET /:id` - Get event details
- `GET /upcoming` - Get upcoming events

#### Booking Routes (`/api/bookings`)

- `POST /` - Create new booking
- `GET /user/:userId` - Get user's bookings
- `GET /:id` - Get booking details
- `DELETE /:id` - Cancel booking

#### Tour Routes (`/api/tours`)

- `POST /` - Record tour completion
- `GET /user/:userId` - Get user's tour history

#### Feedback Routes (`/api/feedback`)

- `POST /` - Submit feedback
- `GET /user/:userId` - Get user's feedback history

### Frontend Components

**Using the Chatbot:**

```tsx
import { AIChatbot } from "@/components/AIChatbot";

function App() {
  return <AIChatbot />;
}
```

**3D Artifact Cards:**

```tsx
import { Artifact3DCard } from "@/components/Artifact3DCard";

<Artifact3DCard
  artifact={{
    id: "1",
    name: "Bust of Nefertiti",
    description: "Ancient Egyptian sculpture",
    image: "/images/nefertiti.jpg",
  }}
  onClick={() => console.log("Clicked!")}
/>;
```

---

## 📚 Documentation

### Project Documentation

| Document                                                      | Purpose                               |
| ------------------------------------------------------------- | ------------------------------------- |
| [README.md](README.md)                                        | This file - Complete project overview |
| [PROJECT_STATUS.md](PROJECT_STATUS.md)                        | Detailed project status and roadmap   |
| [PROJECT_COMPLETION.md](PROJECT_COMPLETION.md)                | Feature completion checklist          |
| [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)            | Implementation details and guides     |
| [IMAGE_SETUP.md](IMAGE_SETUP.md)                              | Image optimization and setup guide    |
| [Quick Start Guide](docs/QUICK_START_GUIDE.md)                | Developer quick start instructions    |
| [Frontend Analysis](docs/FRONTEND_ANALYSIS_AND_NEXT_STEPS.md) | Architecture and next steps           |
| [Backend BUILD_SUMMARY.md](backend/BUILD_SUMMARY.md)          | Backend build and deployment guide    |
| [Backend QUICK_START.md](backend/QUICK_START.md)              | Backend setup instructions            |

---

## 🏗️ Architecture

### Project Structure

```
DocentDesk/
├── 📁 backend/                           # Node.js Express API
│   ├── 📁 api/
│   │   └── index.js                      # Vercel serverless entry point
│   ├── 📁 config/
│   │   ├── passport.js                   # Google OAuth strategy
│   │   └── supabase.js                   # Supabase client
│   ├── 📁 controllers/
│   │   ├── artifact.controller.js        # Artifact CRUD
│   │   ├── auth.controller.js            # Authentication logic
│   │   ├── booking.controller.js         # Event bookings
│   │   ├── chat.controller.js            # AI chatbot
│   │   ├── event.controller.js           # Event management
│   │   ├── feedback.controller.js        # User feedback
│   │   ├── tour.controller.js            # Virtual tours
│   │   └── user.controller.js            # User profile
│   ├── 📁 middleware/
│   │   ├── auth.js                       # JWT verification
│   │   └── errorHandler.js               # Global error handling
│   ├── 📁 models/
│   │   ├── Artifact.model.js             # Artifact schema
│   │   ├── Booking.model.js              # Booking schema
│   │   ├── Event.model.js                # Event schema
│   │   ├── Feedback.model.js             # Feedback schema
│   │   ├── Tour.model.js                 # Tour schema
│   │   └── User.model.js                 # User schema (deprecated, using Supabase)
│   ├── 📁 routes/
│   │   ├── artifact.routes.js            # Artifact endpoints
│   │   ├── auth.routes.js                # Auth endpoints
│   │   ├── booking.routes.js             # Booking endpoints
│   │   ├── chat.routes.js                # Chat endpoints
│   │   ├── event.routes.js               # Event endpoints
│   │   ├── feedback.routes.js            # Feedback endpoints
│   │   ├── tour.routes.js                # Tour endpoints
│   │   └── user.routes.js                # User endpoints
│   ├── 📁 scripts/
│   │   └── seed.js                       # Database seeding
│   ├── 📁 utils/
│   │   ├── asyncHandler.js               # Async error wrapper
│   │   ├── errorResponse.js              # Error formatting
│   │   └── sendEmail.js                  # Email service
│   ├── .env                              # Environment variables
│   ├── package.json                      # Backend dependencies
│   ├── server.js                         # Express server
│   └── vercel.json                       # Vercel deployment config
│
├── 📁 public/                            # Static assets
│   ├── 📁 images/
│   │   ├── artifacts/                    # Artifact images
│   │   └── events/                       # Event images
│   ├── manifest.json                     # PWA manifest
│   ├── robots.txt                        # SEO robots file
│   └── service-worker.js                 # Service worker for PWA
│
├── 📁 src/                               # React frontend
│   ├── 📁 components/
│   │   ├── 📁 booking/                   # Booking wizard components
│   │   │   ├── BookingWizard.tsx
│   │   │   ├── StepTickets.tsx
│   │   │   ├── StepDetails.tsx
│   │   │   ├── StepAddons.tsx
│   │   │   ├── StepPayment.tsx
│   │   │   └── StepConfirmation.tsx
│   │   ├── 📁 dashboard/                 # User dashboard components
│   │   │   ├── MyCollection.tsx
│   │   │   ├── MyTickets.tsx
│   │   │   ├── TourHistory.tsx
│   │   │   └── Settings.tsx
│   │   ├── 📁 tour/                      # 3D virtual tour components
│   │   │   ├── TourScene.tsx
│   │   │   ├── MuseumRoom.tsx
│   │   │   ├── CameraController.tsx
│   │   │   ├── ArtifactHotspot.tsx
│   │   │   └── FloorPlan.tsx
│   │   ├── 📁 ui/                        # shadcn/ui components (60+)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── ... (55 more)
│   │   ├── AIChatbot.tsx                 # AI chatbot interface
│   │   ├── AnimatedAuthModal.tsx         # Login/register modal
│   │   ├── Artifact3DCard.tsx            # 3D artifact card
│   │   ├── ArtifactImage.tsx             # Optimized artifact images
│   │   ├── AuthModal.tsx                 # Simple auth modal
│   │   ├── CartButton.tsx                # Shopping cart button
│   │   ├── EventImage.tsx                # Optimized event images
│   │   ├── ExhibitShowcase.tsx           # Featured exhibits
│   │   ├── FeaturesSection.tsx           # Features on homepage
│   │   ├── Footer.tsx                    # Site footer
│   │   ├── HeroSection.tsx               # Homepage hero
│   │   ├── LanguageSelector.tsx          # Language switcher
│   │   ├── LoadingScreen.tsx             # 3D animated loading screen ⭐
│   │   ├── Museum3DScene.tsx             # 3D museum visualization
│   │   ├── Navigation.tsx                # Main navigation bar
│   │   ├── NavLink.tsx                   # Navigation link component
│   │   ├── ThemeToggle.tsx               # Dark/light theme switch
│   │   └── UserMenu.tsx                  # User dropdown menu
│   ├── 📁 contexts/
│   │   └── AuthContext.tsx               # Authentication context
│   ├── 📁 data/
│   │   └── artifacts.ts                  # Mock artifact data
│   ├── 📁 hooks/
│   │   ├── useArtifacts.ts               # Artifact data hook
│   │   ├── useChatContext.ts             # Chatbot context hook
│   │   └── use-toast.ts                  # Toast notifications
│   ├── 📁 i18n/
│   │   ├── index.ts                      # i18next configuration
│   │   └── 📁 locales/                   # Translation files
│   │       ├── en.json                   # English
│   │       ├── es.json                   # Spanish
│   │       ├── fr.json                   # French
│   │       ├── de.json                   # German
│   │       ├── it.json                   # Italian
│   │       ├── zh.json                   # Chinese
│   │       ├── ar.json                   # Arabic
│   │       └── hi.json                   # Hindi
│   ├── 📁 integrations/
│   │   └── 📁 supabase/
│   │       ├── client.ts                 # Supabase client (frontend)
│   │       └── types.ts                  # Database types
│   ├── 📁 lib/
│   │   └── utils.ts                      # Utility functions
│   ├── 📁 pages/
│   │   ├── Index.tsx                     # Homepage
│   │   ├── VirtualTour.tsx               # 3D tour page
│   │   ├── Events.tsx                    # Events listing
│   │   ├── Exhibits.tsx                  # Artifacts gallery
│   │   ├── About.tsx                     # About museum
│   │   ├── Dashboard.tsx                 # User dashboard
│   │   └── NotFound.tsx                  # 404 page
│   ├── 📁 styles/
│   │   └── accessibility.css             # Accessibility styles
│   ├── App.tsx                           # Main App component
│   ├── App.css                           # App styles
│   ├── main.tsx                          # React entry point
│   ├── index.css                         # Global styles
│   └── vite-env.d.ts                     # Vite type definitions
│
├── 📁 docs/                              # Documentation
│   ├── FRONTEND_ANALYSIS_AND_NEXT_STEPS.md
│   ├── QUICK_START_GUIDE.md
│   ├── README_PROJECT_SUMMARY.md
│   └── 📁 Lovable-AI-Prompts/            # AI prompt history
│
├── 📁 supabase/                          # Supabase configuration
│   ├── config.toml                       # Supabase CLI config
│   ├── 📁 functions/                     # Edge functions (future)
│   └── 📁 migrations/
│       └── 001_create_users_table.sql    # Database migrations
│
├── .env                                  # Frontend environment variables
├── .gitignore                            # Git ignore rules
├── bun.lockb                             # Bun lockfile
├── components.json                       # shadcn/ui config
├── eslint.config.js                      # ESLint configuration
├── index.html                            # HTML entry point
├── package.json                          # Frontend dependencies
├── postcss.config.js                     # PostCSS config
├── README.md                             # This file ⭐
├── tailwind.config.ts                    # Tailwind CSS config
├── tsconfig.json                         # TypeScript config
├── tsconfig.app.json                     # App TypeScript config
├── tsconfig.node.json                    # Node TypeScript config
└── vite.config.ts                        # Vite configuration
```

### Component Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                   App.tsx                           │
│  ┌─────────────────────────────────────────────┐   │
│  │   LoadingScreen (2s 3D animation)           │   │
│  │   → Premium 3D cube, particles, progress    │   │
│  └─────────────────────────────────────────────┘   │
│                       ↓                             │
│  ┌─────────────────────────────────────────────┐   │
│  │   AuthProvider (Context)                    │   │
│  │   → User state, JWT tokens, login/logout    │   │
│  └─────────────────────────────────────────────┘   │
│                       ↓                             │
│  ┌─────────────────────────────────────────────┐   │
│  │   QueryClientProvider (TanStack Query)      │   │
│  │   → API caching, server state management    │   │
│  └─────────────────────────────────────────────┘   │
│                       ↓                             │
│  ┌─────────────────────────────────────────────┐   │
│  │   Router (React Router DOM)                 │   │
│  │   ├── / (Index)                             │   │
│  │   ├── /virtual-tour (TourScene)             │   │
│  │   ├── /events (Events + BookingWizard)      │   │
│  │   ├── /exhibits (Artifacts Gallery)         │   │
│  │   ├── /about (About Page)                   │   │
│  │   ├── /dashboard (Protected Route)          │   │
│  │   └── * (NotFound)                          │   │
│  └─────────────────────────────────────────────┘   │
│                       ↓                             │
│  ┌─────────────────────────────────────────────┐   │
│  │   Navigation Bar                            │   │
│  │   ├── Logo                                  │   │
│  │   ├── Nav Links (with i18n)                │   │
│  │   ├── Language Selector                     │   │
│  │   ├── Theme Toggle                          │   │
│  │   └── User Menu / Auth Modal               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │   AIChatbot (Floating)                      │   │
│  │   → Always available, voice + text          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │   Footer                                     │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Authentication Flow

```
User Action → Frontend → Backend → Supabase → Response
───────────────────────────────────────────────────────

1. Google OAuth:
   Click "Sign in with Google"
   → GET /api/auth/google
   → Google authorization page
   → Callback → /api/auth/google/callback
   → Check Supabase: user exists?
   → Create/Update user in Supabase
   → Generate JWT token
   → Redirect to frontend with token
   → Store token in localStorage
   → Fetch user profile: GET /api/users/me

2. Email/Password Login:
   Enter credentials
   → POST /api/auth/login { email, password }
   → Query Supabase users table
   → bcrypt.compare(password, hashedPassword)
   → Generate JWT: jwt.sign({ id, email }, JWT_SECRET)
   → Return { token, user }
   → Store token, update AuthContext

3. Protected Route Access:
   Navigate to /dashboard
   → AuthContext checks if user exists
   → If no token → Redirect to /
   → If token exists → GET /api/users/me
   → Headers: { Authorization: Bearer <token> }
   → Middleware verifies JWT
   → Supabase query: SELECT * FROM users WHERE id = ?
   → Return user data
   → Render Dashboard
```

### Database Relationships

```sql
users (id, email, google_id, name)
  ├── bookings (user_id → users.id)
  │     └── events (event_id → events.id)
  ├── tours (user_id → users.id)
  └── feedback (user_id → users.id)

artifacts (id, name, category, featured)
  └── (no direct FK, referenced in tours.artifacts_visited[])

events (id, title, date, capacity, price)
  └── bookings (event_id → events.id)
```

---

## 🚢 Deployment

### Production URLs

- **Frontend**: https://docent-desk-ai-chatbot.vercel.app
- **Backend API**: https://docentdesk-backend-api.vercel.app

### Deploy to Vercel (Recommended)

#### Frontend Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy frontend
vercel

# Set environment variables in Vercel Dashboard:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_PUBLISHABLE_KEY
# - VITE_BACKEND_URL (https://your-backend.vercel.app)

# Production deployment
vercel --prod
```

#### Backend Deployment

```bash
# Navigate to backend
cd backend

# Deploy backend
vercel

# Set environment variables in Vercel Dashboard:
# - SUPABASE_URL
# - SUPABASE_SERVICE_KEY
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - GOOGLE_CALLBACK_URL (https://your-backend.vercel.app/api/auth/google/callback)
# - JWT_SECRET
# - SESSION_SECRET
# - CLIENT_URL (https://your-frontend.vercel.app)

# Production deployment
vercel --prod
```

**Important**: Update Google OAuth authorized redirect URIs in Google Cloud Console:

- `https://docentdesk-backend-api.vercel.app/api/auth/google/callback`

#### Deploy Buttons

[![Deploy Frontend with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot)

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

Configure build settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: Same as Vercel

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 8080

# Start
CMD ["npm", "run", "preview"]
```

```bash
# Build image
docker build -t docentdesk:latest .

# Run container
docker run -p 8080:8080 \
  -e VITE_SUPABASE_URL=your_url \
  -e VITE_SUPABASE_PUBLISHABLE_KEY=your_key \
  docentdesk:latest
```

### Environment Configuration

**Production Checklist:**

- ✅ Set all environment variables in deployment platform
- ✅ Update Google OAuth redirect URIs
- ✅ Configure CORS in backend for production domain
- ✅ Enable HTTPS (automatic on Vercel/Netlify)
- ✅ Set up custom domain (optional)
- ✅ Configure CDN for static assets
- ✅ Enable Supabase RLS policies
- ✅ Monitor logs and errors

### Performance Optimization

Production builds include:

- ✅ **Code splitting** - Separate chunks for each route
- ✅ **Tree shaking** - Remove unused code
- ✅ **Minification** - UglifyJS for JS, cssnano for CSS
- ✅ **Image optimization** - Lazy loading with placeholders
- ✅ **Service worker** - Offline caching for PWA
- ✅ **Gzip compression** - Reduce file sizes
- ✅ **Asset hashing** - Cache busting for updates

**Build Performance:**

```bash
npm run build

# Output:
# dist/assets/index-a3b2c1d4.js      142 KB (gzipped: 45 KB)
# dist/assets/vendor-e5f6g7h8.js     380 KB (gzipped: 120 KB)
# dist/assets/index-i9j0k1l2.css     28 KB (gzipped: 6 KB)
```

---

## 💻 Development Guide

### Available Scripts

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Start frontend dev server (port 8080) |
| `npm run build`      | Production build                      |
| `npm run build:dev`  | Development build with source maps    |
| `npm run preview`    | Preview production build locally      |
| `npm run lint`       | Run ESLint                            |
| `npm run type-check` | TypeScript type checking              |

**Backend Scripts (in `/backend`):**
| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend dev server with nodemon (port 5000) |
| `npm start` | Start production server |
| `npm run seed` | Seed database with sample data |

### Code Style Guide

#### TypeScript Best Practices

```typescript
// ✅ DO: Use interfaces for props
interface ArtifactCardProps {
  artifact: Artifact;
  onClick: () => void;
  featured?: boolean;
}

// ✅ DO: Use named exports
export function ArtifactCard({ artifact, onClick }: ArtifactCardProps) {
  // Component logic
}

// ❌ DON'T: Use default exports
export default function Component() { ... }

// ✅ DO: Use const assertions for constants
const ARTIFACT_CATEGORIES = ['Art', 'Sculpture', 'History'] as const;

// ✅ DO: Type all function parameters and returns
function calculateDiscount(price: number, percent: number): number {
  return price * (percent / 100);
}
```

#### React Patterns

```tsx
// ✅ DO: Use custom hooks for logic
function useArtifactData(id: string) {
  return useQuery({
    queryKey: ["artifact", id],
    queryFn: () => fetchArtifact(id),
  });
}

// ✅ DO: Destructure props
function Card({ title, description, image }: CardProps) {
  return <div>...</div>;
}

// ✅ DO: Use optional chaining
const userName = user?.name ?? "Guest";

// ✅ DO: Use early returns
function UserProfile({ user }: UserProfileProps) {
  if (!user) return <LoadingSpinner />;
  if (user.deleted) return <DeletedMessage />;
  return <ProfileDetails user={user} />;
}
```

#### Tailwind CSS Guidelines

```tsx
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center gap-4 p-6 bg-blue-950 rounded-lg shadow-xl">

// ❌ DON'T: Use inline styles (except for dynamic values)
<div style={{ backgroundColor: 'blue' }}>

// ✅ DO: Use CSS variables for theme colors
<div className="bg-[hsl(var(--primary))]">

// ✅ DO: Group related utilities
<button className="
  px-6 py-3
  text-white font-semibold
  bg-primary hover:bg-primary/90
  rounded-lg shadow-md
  transition-all duration-200
">
```

### Adding New Features

#### 1. Add shadcn/ui Component

```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add calendar
```

#### 2. Create New API Endpoint

```javascript
// backend/routes/newFeature.routes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getFeatures,
  createFeature,
} from "../controllers/newFeature.controller.js";

const router = express.Router();

router.get("/", getFeatures);
router.post("/", protect, createFeature);

export default router;
```

```javascript
// backend/controllers/newFeature.controller.js
import supabase from "../config/supabase.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getFeatures = asyncHandler(async (req, res) => {
  const { data, error } = await supabase.from("features").select("*");

  if (error) throw error;

  res.json({
    success: true,
    data,
  });
});
```

```javascript
// backend/server.js
import newFeatureRoutes from "./routes/newFeature.routes.js";
app.use("/api/features", newFeatureRoutes);
```

#### 3. Add Translation Keys

```json
// src/i18n/locales/en.json
{
  "newFeature": {
    "title": "New Feature",
    "description": "This is a new feature",
    "action": "Try Now"
  }
}

// src/i18n/locales/es.json
{
  "newFeature": {
    "title": "Nueva Función",
    "description": "Esta es una nueva función",
    "action": "Probar Ahora"
  }
}
```

#### 4. Create Database Migration

```sql
-- supabase/migrations/002_add_feature_table.sql
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read features" ON features
  FOR SELECT USING (enabled = true);

CREATE POLICY "Authenticated can manage features" ON features
  FOR ALL USING (auth.role() = 'authenticated');
```

##

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mritunjai-prog/DocentDesk-Museum-Chatbot&type=Date)](https://star-history.com/#mritunjai-prog/DocentDesk-Museum-Chatbot&Date)

---

<div align="center">

## Made with for museums and cultural institutions worldwide

**Transform your museum experience with AI, 3D tours, and intelligent assistance**

[ Back to Top](#-docentdesk---ai-museum-companion)

---

**DocentDesk v1.0.0** **Last Updated**: December 20, 2025 [GitHub](https://github.com/mritunjai-prog/DocentDesk-Museum-Chatbot) [Live Demo](https://docent-desk-ai-chatbot.vercel.app)

</div>
