import express from "express";
import { sendMessage, getChatHistory, streamChat } from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Streaming chat endpoint (public, no auth required for voice input)
router.route("/").post(streamChat);

router.route("/message").post(protect, sendMessage);

router.route("/history/:tourId").get(protect, getChatHistory);

export default router;
