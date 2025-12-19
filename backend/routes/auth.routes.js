import express from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  googleAuthCallback,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Local authentication
router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getCurrentUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);
router.put("/update-password", protect, updatePassword);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/login",
    session: false,
  }),
  googleAuthCallback
);

export default router;
