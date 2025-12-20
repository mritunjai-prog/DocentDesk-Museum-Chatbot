import express from "express";
import { sendMessage, getChatHistory } from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/message").post(protect, sendMessage);

router.route("/history/:tourId").get(protect, getChatHistory);

export default router;
