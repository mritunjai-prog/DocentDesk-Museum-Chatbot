import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables (only needed for local development)
// Vercel provides environment variables through platform configuration
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import colors from "colors";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now import modules that depend on env vars
import "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import artifactRoutes from "./routes/artifact.routes.js";
import eventRoutes from "./routes/event.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import userRoutes from "./routes/user.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import tourRoutes from "./routes/tour.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import errorHandler from "./middleware/errorHandler.js";

// Debug logging
console.log(`🔍 Environment loaded`);
console.log(`📝 MONGO_URI loaded: ${process.env.MONGO_URI ? "YES" : "NO"}`);
console.log(`📝 PORT: ${process.env.PORT}`);

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// Static files
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DocentDesk API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Root endpoint - API documentation
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DocentDesk Museum Platform API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      authentication: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        logout: "POST /api/auth/logout",
        me: "GET /api/auth/me",
        googleOAuth: "GET /api/auth/google",
      },
      artifacts: {
        getAll: "GET /api/artifacts",
        getOne: "GET /api/artifacts/:id",
        create: "POST /api/artifacts (admin only)",
        update: "PUT /api/artifacts/:id (admin only)",
        delete: "DELETE /api/artifacts/:id (admin only)",
      },
      events: {
        getAll: "GET /api/events",
        getOne: "GET /api/events/:id",
        create: "POST /api/events (admin only)",
        update: "PUT /api/events/:id (admin only)",
        delete: "DELETE /api/events/:id (admin only)",
      },
      bookings: {
        getAll: "GET /api/bookings",
        getOne: "GET /api/bookings/:id",
        create: "POST /api/bookings",
        cancel: "DELETE /api/bookings/:id",
      },
      feedback: {
        getAll: "GET /api/feedback",
        create: "POST /api/feedback",
        update: "PUT /api/feedback/:id",
        delete: "DELETE /api/feedback/:id",
      },
      users: {
        getProfile: "GET /api/users/profile",
        updateProfile: "PUT /api/users/profile",
        savedArtifacts: "GET /api/users/saved-artifacts",
      },
      tours: {
        getAll: "GET /api/tours",
        getOne: "GET /api/tours/:id",
      },
      chat: {
        sendMessage: "POST /api/chat/message",
        getHistory: "GET /api/chat/history",
      },
    },
    documentation: "See README.md for full API documentation",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/artifacts", artifactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/chat", chatRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
const connectDB = async () => {
  try {
    console.log(`🔍 Attempting MongoDB connection...`.yellow);
    console.log(`📝 MONGO_URI exists: ${!!process.env.MONGO_URI}`.yellow);

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`.red);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Start server (for local development)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
    console.log(`📱 Client URL: ${process.env.CLIENT_URL}`);
    console.log(`🌐 API URL: http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

export default app;
