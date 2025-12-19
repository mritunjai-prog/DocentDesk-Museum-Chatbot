import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    artifact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artifact",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
    type: {
      type: String,
      enum: ["artifact", "event", "tour", "general"],
      required: [true, "Feedback type is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
      trim: true,
    },
    title: {
      type: String,
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    reply: {
      text: String,
      repliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      repliedAt: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
feedbackSchema.index({ user: 1, type: 1 });
feedbackSchema.index({ artifact: 1, rating: -1 });
feedbackSchema.index({ event: 1, rating: -1 });
feedbackSchema.index({ createdAt: -1 });

// Prevent duplicate feedback for same item
// Use partial indexes to only enforce uniqueness when the field exists
feedbackSchema.index(
  { user: 1, artifact: 1 },
  {
    unique: true,
    partialFilterExpression: { artifact: { $exists: true, $ne: null } },
  }
);
feedbackSchema.index(
  { user: 1, event: 1 },
  {
    unique: true,
    partialFilterExpression: { event: { $exists: true, $ne: null } },
  }
);
feedbackSchema.index(
  { user: 1, tour: 1 },
  {
    unique: true,
    partialFilterExpression: { tour: { $exists: true, $ne: null } },
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
