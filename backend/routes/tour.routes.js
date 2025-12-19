import express from "express";
import {
  startTour,
  getTour,
  updateTour,
  completeTour,
  visitArtifact,
  getUserTours,
} from "../controllers/tour.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, startTour);

router.route("/my-tours").get(protect, getUserTours);

router.route("/:id").get(protect, getTour).put(protect, updateTour);

router.route("/:id/complete").post(protect, completeTour);

router.route("/:id/artifact").post(protect, visitArtifact);

export default router;
