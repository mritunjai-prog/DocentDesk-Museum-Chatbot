import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getSavedArtifacts,
  addSavedArtifact,
  removeSavedArtifact,
  getTourHistory,
  updatePreferences,
  deleteAccount,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/me")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteAccount);

router.route("/me/collection").get(protect, getSavedArtifacts);

router
  .route("/me/collection/:artifactId")
  .post(protect, addSavedArtifact)
  .delete(protect, removeSavedArtifact);

router.route("/me/tours").get(protect, getTourHistory);

router.route("/me/preferences").put(protect, updatePreferences);

export default router;
