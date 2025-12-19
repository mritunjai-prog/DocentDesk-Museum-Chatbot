# DocentDesk Museum - Backend API

Complete Node.js + Express.js REST API for the DocentDesk Museum platform, featuring MongoDB database, Google OAuth authentication, JWT tokens, OpenAI chatbot integration, and comprehensive event booking system.

## 🚀 Features

- **Authentication & Authorization**

  - Local registration/login with JWT tokens
  - Google OAuth 2.0 integration
  - Role-based access control (User, Moderator, Admin)
  - Password reset with email verification
  - Session management with httpOnly cookies

- **Core APIs**

  - **Artifacts**: CRUD operations, search, categories, featured items, view/like tracking
  - **Events**: Event management, booking system, capacity tracking, multi-tier pricing
  - **Bookings**: QR code generation, email confirmations, refund calculations
  - **Users**: Profile management, saved artifacts, tour history, preferences
  - **Feedback**: Reviews & ratings for artifacts/events, helpful votes, admin replies
  - **Tours**: Virtual tour tracking, artifact visits, time tracking
  - **Chat**: AI-powered museum docent using OpenAI GPT-4

- **Advanced Features**
  - QR code generation for event tickets
  - Email notifications (booking confirmations, password resets)
  - File upload handling with image optimization
  - Rate limiting for API protection
  - Comprehensive error handling
  - Database seeding script with sample data

## 📋 Prerequisites

- **Node.js**: v18.x or higher
- **MongoDB**: v6.0 or higher (local or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1. Clone the Repository

```bash
cd "d:\DocentDesk - AI Chatbot\backend"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and configure all required variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# MongoDB
MONGO_URI=mongodb://localhost:27017/docentdesk
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/docentdesk?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Session
SESSION_SECRET=your_session_secret_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4

# Email Configuration (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=DocentDesk Museum <noreply@docentdesk.com>

# Payment (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_UPLOAD=10485760
FILE_UPLOAD_PATH=./uploads
```

## 🔧 Configuration Guides

### MongoDB Setup

#### Option 1: Local MongoDB

1. Install MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:

   ```bash
   # Windows
   net start MongoDB

   # macOS (Homebrew)
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

3. Use connection string: `mongodb://localhost:27017/docentdesk`

#### Option 2: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (Free tier available)
3. Add database user (Database Access)
4. Whitelist IP address (Network Access → Add IP → Allow from Anywhere for development)
5. Get connection string: Clusters → Connect → Connect your application
6. Replace `<password>` with your database user password
7. Use in `.env` as `MONGO_URI`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable **Google+ API**:
   - APIs & Services → Library → Search "Google+ API" → Enable
4. Create OAuth 2.0 Credentials:
   - APIs & Services → Credentials → Create Credentials → OAuth client ID
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:5000`
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
5. Copy **Client ID** and **Client Secret** to `.env`

### Email Configuration (Gmail)

1. Enable 2-Factor Authentication on your Google account
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Select app: Mail, Select device: Other (Custom name)
   - Generate and copy the 16-character password
3. Use in `.env`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # 16-char app password
   ```

### OpenAI API Setup

1. Create account at [platform.openai.com](https://platform.openai.com)
2. Go to [API Keys](https://platform.openai.com/api-keys)
3. Create new secret key
4. Copy key to `.env` as `OPENAI_API_KEY`
5. Set model (gpt-4, gpt-3.5-turbo, etc.)

**Note**: OpenAI API requires billing setup. Check [pricing](https://openai.com/pricing).

### JWT Secret Generation

Generate a secure random string:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use online generator
# https://randomkeygen.com/
```

## 🚦 Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will start on `http://localhost:5000`

## 🌱 Seeding the Database

Populate MongoDB with sample data (12 artifacts, 6 events, users, feedback):

```bash
npm run seed
```

**Default admin credentials:**

- Email: `admin@docentdesk.com`
- Password: `admin123456`

**Sample user credentials:**

- Email: `user1@example.com` / Password: `password123`
- Email: `user2@example.com` / Password: `password123`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint                      | Description            | Access  |
| ------ | ----------------------------- | ---------------------- | ------- |
| POST   | `/auth/register`              | Register new user      | Public  |
| POST   | `/auth/login`                 | Login user             | Public  |
| POST   | `/auth/logout`                | Logout user            | Private |
| GET    | `/auth/me`                    | Get current user       | Private |
| POST   | `/auth/forgot-password`       | Request password reset | Public  |
| PUT    | `/auth/reset-password/:token` | Reset password         | Public  |
| PUT    | `/auth/update-password`       | Update password        | Private |
| GET    | `/auth/google`                | Initiate Google OAuth  | Public  |
| GET    | `/auth/google/callback`       | Google OAuth callback  | Public  |

**Example - Register:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "language": "en"
}
```

**Example - Login:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

# Response includes JWT token
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Artifacts Endpoints

| Method | Endpoint              | Description                               | Access          |
| ------ | --------------------- | ----------------------------------------- | --------------- |
| GET    | `/artifacts`          | Get all artifacts (paginated, searchable) | Public          |
| POST   | `/artifacts`          | Create artifact                           | Admin/Moderator |
| GET    | `/artifacts/featured` | Get featured artifacts                    | Public          |
| GET    | `/artifacts/:id`      | Get single artifact                       | Public          |
| PUT    | `/artifacts/:id`      | Update artifact                           | Admin/Moderator |
| DELETE | `/artifacts/:id`      | Delete artifact                           | Admin           |
| POST   | `/artifacts/:id/view` | Increment view count                      | Public          |
| POST   | `/artifacts/:id/like` | Like artifact                             | Private         |

**Query Parameters for GET /artifacts:**

- `page` (default: 1)
- `limit` (default: 20)
- `category` (Sculpture, Painting, Jewelry, Pottery, Manuscript, etc.)
- `search` (text search in title/description/tags)
- `sort` (popular, likes, title, date)

**Example:**

```bash
GET /api/artifacts?category=Sculpture&page=1&limit=10&sort=popular
```

### Events Endpoints

| Method | Endpoint           | Description                            | Access          |
| ------ | ------------------ | -------------------------------------- | --------------- |
| GET    | `/events`          | Get all events (paginated, filterable) | Public          |
| POST   | `/events`          | Create event                           | Admin/Moderator |
| GET    | `/events/featured` | Get featured events                    | Public          |
| GET    | `/events/:id`      | Get single event                       | Public          |
| PUT    | `/events/:id`      | Update event                           | Admin/Moderator |
| DELETE | `/events/:id`      | Delete event                           | Admin           |

**Query Parameters for GET /events:**

- `page`, `limit`
- `category` (Exhibition, Workshop, Tour, Lecture, etc.)
- `startDate`, `endDate` (filter by date range)
- `search` (text search)

### Bookings Endpoints

| Method | Endpoint                | Description                                     | Access  |
| ------ | ----------------------- | ----------------------------------------------- | ------- |
| POST   | `/bookings`             | Create booking (generates QR code, sends email) | Private |
| GET    | `/bookings`             | Get all bookings                                | Admin   |
| GET    | `/bookings/my-bookings` | Get user's bookings                             | Private |
| GET    | `/bookings/:id`         | Get single booking                              | Private |
| PUT    | `/bookings/:id/cancel`  | Cancel booking (calculates refund)              | Private |

**Example - Create Booking:**

```bash
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "event": "event_id_here",
  "tickets": {
    "adult": { "quantity": 2, "price": 150 },
    "child": { "quantity": 1, "price": 75 }
  },
  "contactDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+20123456789"
  },
  "specialRequests": "Wheelchair access needed"
}

# Response includes QR code and booking reference
```

### Users Endpoints

| Method | Endpoint                           | Description                               | Access  |
| ------ | ---------------------------------- | ----------------------------------------- | ------- |
| GET    | `/users/me`                        | Get user profile                          | Private |
| PUT    | `/users/me`                        | Update profile                            | Private |
| DELETE | `/users/me`                        | Deactivate account                        | Private |
| GET    | `/users/me/collection`             | Get saved artifacts                       | Private |
| POST   | `/users/me/collection/:artifactId` | Save artifact                             | Private |
| DELETE | `/users/me/collection/:artifactId` | Remove artifact                           | Private |
| GET    | `/users/me/tours`                  | Get tour history                          | Private |
| PUT    | `/users/me/preferences`            | Update preferences (theme, notifications) | Private |

### Feedback Endpoints

| Method | Endpoint                | Description                   | Access                |
| ------ | ----------------------- | ----------------------------- | --------------------- |
| GET    | `/feedback`             | Get all feedback (filterable) | Public                |
| POST   | `/feedback`             | Create feedback               | Private               |
| PUT    | `/feedback/:id`         | Update feedback               | Private (owner)       |
| DELETE | `/feedback/:id`         | Delete feedback               | Private (owner/admin) |
| POST   | `/feedback/:id/helpful` | Mark as helpful               | Private               |
| POST   | `/feedback/:id/report`  | Report feedback               | Private               |
| PUT    | `/feedback/:id/reply`   | Reply to feedback             | Admin/Moderator       |

**Example - Create Feedback:**

```bash
POST /api/feedback
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "artifact",
  "artifact": "artifact_id_here",
  "rating": 5,
  "title": "Amazing artifact!",
  "comment": "The craftsmanship is incredible..."
}
```

### Tours Endpoints

| Method | Endpoint              | Description                     | Access  |
| ------ | --------------------- | ------------------------------- | ------- |
| POST   | `/tours`              | Start new tour                  | Private |
| GET    | `/tours/my-tours`     | Get user's tours                | Private |
| GET    | `/tours/:id`          | Get tour details                | Private |
| PUT    | `/tours/:id`          | Update tour (add chat messages) | Private |
| POST   | `/tours/:id/complete` | Mark tour as completed          | Private |
| POST   | `/tours/:id/artifact` | Mark artifact as visited        | Private |

### Chat Endpoints

| Method | Endpoint                | Description               | Access  |
| ------ | ----------------------- | ------------------------- | ------- |
| POST   | `/chat/message`         | Send message to AI docent | Private |
| GET    | `/chat/history/:tourId` | Get chat history          | Private |

**Example - Chat with AI:**

```bash
POST /api/chat/message
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Tell me about the Rosetta Stone",
  "artifactId": "artifact_id_here",
  "tourId": "tour_id_here",
  "conversationHistory": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Welcome to the museum!" }
  ]
}

# Response from GPT-4 docent
{
  "success": true,
  "data": {
    "message": "Tell me about the Rosetta Stone",
    "response": "The Rosetta Stone is one of the most important...",
    "timestamp": 1703012345678
  }
}
```

## 🔐 Authentication

### Using JWT Tokens

Include token in requests using **Bearer token** in Authorization header:

```bash
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Or token is automatically sent via **httpOnly cookie** if login was done in same browser.

### Role-Based Access

- **Public**: No authentication required
- **Private**: Requires valid JWT token (any logged-in user)
- **Admin**: Requires admin role
- **Moderator**: Requires moderator or admin role

## 🗂️ Database Models

### User

- Authentication (local/Google)
- Profile (name, avatar, phone)
- Preferences (language, theme, notifications)
- Saved artifacts collection
- Tour history

### Artifact

- Title, description, images
- Category, era, origin
- 3D position, model URL
- View/like counts
- Multi-language translations
- Related artifacts

### Event

- Title, description, category
- Date/time, duration
- Venue with coordinates
- Multi-tier pricing (adult/child/senior/student)
- Capacity tracking
- Speakers, highlights
- Organizer reference

### Booking

- Event and user references
- Ticket breakdown by type
- Total amount and currency
- Contact details
- QR code for check-in
- Payment status
- Refund calculations

### Feedback

- Linked to artifact/event/tour
- 1-5 star rating
- Title and comment
- Helpful votes
- Admin reply system
- Report/moderation

### Tour

- User and artifact tracking
- Start/completion times
- Visit durations per artifact
- Chat message history
- Interaction counts
- Status (in-progress/completed/abandoned)

## 🎨 Frontend Integration

### Update Frontend API Calls

In your React frontend ([src/integrations/supabase](../src/integrations/supabase)), replace Supabase calls with axios requests:

```javascript
// Example: src/api/client.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### Environment Variables

Add to frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

Test endpoints using:

- **Postman**: Import collection from `docs/postman_collection.json` (if available)
- **curl**: Command-line testing
- **REST Client**: VS Code extension

Example curl request:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@docentdesk.com","password":"admin123456"}'

# Get artifacts
curl http://localhost:5000/api/artifacts?category=Sculpture

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"event":"EVENT_ID","tickets":{"adult":{"quantity":2,"price":150}},"contactDetails":{"name":"Test","email":"test@test.com"}}'
```

## 📁 Project Structure

```
backend/
├── config/
│   └── passport.js              # Passport.js strategies
├── controllers/
│   ├── artifact.controller.js   # Artifact CRUD logic
│   ├── auth.controller.js       # Authentication logic
│   ├── booking.controller.js    # Booking & QR codes
│   ├── chat.controller.js       # OpenAI integration
│   ├── event.controller.js      # Event management
│   ├── feedback.controller.js   # Reviews & ratings
│   ├── tour.controller.js       # Virtual tours
│   └── user.controller.js       # User profile
├── middleware/
│   ├── auth.js                  # JWT verification & authorization
│   └── errorHandler.js          # Global error handling
├── models/
│   ├── Artifact.model.js        # Artifact schema
│   ├── Booking.model.js         # Booking schema
│   ├── Event.model.js           # Event schema
│   ├── Feedback.model.js        # Feedback schema
│   ├── Tour.model.js            # Tour schema
│   └── User.model.js            # User schema
├── routes/
│   ├── artifact.routes.js       # Artifact endpoints
│   ├── auth.routes.js           # Auth endpoints
│   ├── booking.routes.js        # Booking endpoints
│   ├── chat.routes.js           # Chat endpoints
│   ├── event.routes.js          # Event endpoints
│   ├── feedback.routes.js       # Feedback endpoints
│   ├── tour.routes.js           # Tour endpoints
│   └── user.routes.js           # User endpoints
├── scripts/
│   └── seed.js                  # Database seeding
├── utils/
│   ├── asyncHandler.js          # Async error wrapper
│   ├── errorResponse.js         # Custom error class
│   └── sendEmail.js             # Email utility
├── .env.example                 # Environment template
├── package.json                 # Dependencies
├── README.md                    # This file
└── server.js                    # Express app entry point
```

## 🚀 Deployment

### Heroku Deployment

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create docentdesk-api

# Add MongoDB Atlas addon (or use existing URI)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
heroku config:set GOOGLE_CLIENT_ID=your_id
# ... (set all variables from .env)

# Deploy
git push heroku main

# Open app
heroku open
```

### Railway/Render Deployment

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

### VPS Deployment (Ubuntu)

```bash
# Install Node.js & MongoDB
sudo apt update
sudo apt install nodejs npm mongodb

# Clone repo
git clone https://github.com/yourusername/docentdesk-backend
cd docentdesk-backend

# Install dependencies
npm install

# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start server.js --name docentdesk-api
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt install nginx
# Configure Nginx to proxy port 5000
```

## 🐛 Troubleshooting

### MongoDB Connection Error

- Verify MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `.env`
- For Atlas: Whitelist IP address in Network Access

### Google OAuth Not Working

- Verify redirect URI matches exactly in Google Console
- Check Client ID and Secret are correct
- Ensure Google+ API is enabled

### OpenAI API Errors

- Verify API key is valid
- Check billing is set up
- Monitor usage at [platform.openai.com/usage](https://platform.openai.com/usage)

### Email Not Sending

- For Gmail: Use App Password, not regular password
- Verify 2FA is enabled
- Check firewall isn't blocking port 587

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

## 📄 License

This project is part of the DocentDesk Museum platform. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.

---

**Backend API v1.0.0** | Built with ❤️ for DocentDesk Museum
