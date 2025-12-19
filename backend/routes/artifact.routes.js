import express from "express";
import {
  getArtifacts,
  getArtifact,
  createArtifact,
  updateArtifact,
  deleteArtifact,
  getFeaturedArtifacts,
  incrementViews,
  likeArtifact,
} from "../controllers/artifact.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(getArtifacts)
  .post(protect, authorize("admin", "moderator"), createArtifact);

router.route("/featured").get(getFeaturedArtifacts);

router
  .route("/:id")
  .get(getArtifact)
  .put(protect, authorize("admin", "moderator"), updateArtifact)
  .delete(protect, authorize("admin"), deleteArtifact);

router.route("/:id/view").post(incrementViews);

router.route("/:id/like").post(protect, likeArtifact);

export default router;
