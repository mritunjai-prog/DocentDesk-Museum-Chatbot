import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getFeaturedEvents,
} from "../controllers/event.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(getEvents)
  .post(protect, authorize("admin", "moderator"), createEvent);

router.route("/featured").get(getFeaturedEvents);

router
  .route("/:id")
  .get(getEvent)
  .put(protect, authorize("admin", "moderator"), updateEvent)
  .delete(protect, authorize("admin"), deleteEvent);

export default router;
