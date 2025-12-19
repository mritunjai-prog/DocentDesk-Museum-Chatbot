import express from "express";
import {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking,
  getUserBookings,
} from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, createBooking).get(protect, getBookings);

router.route("/my-bookings").get(protect, getUserBookings);

router.route("/:id").get(protect, getBooking);

router.route("/:id/cancel").put(protect, cancelBooking);

export default router;
