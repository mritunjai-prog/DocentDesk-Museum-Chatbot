import express from "express";
import {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  markHelpful,
  reportFeedback,
  replyToFeedback,
} from "../controllers/feedback.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getFeedback).post(protect, createFeedback);

router
  .route("/:id")
  .put(protect, updateFeedback)
  .delete(protect, deleteFeedback);

router.route("/:id/helpful").post(protect, markHelpful);

router.route("/:id/report").post(protect, reportFeedback);

router
  .route("/:id/reply")
  .put(protect, authorize("admin", "moderator"), replyToFeedback);

export default router;
