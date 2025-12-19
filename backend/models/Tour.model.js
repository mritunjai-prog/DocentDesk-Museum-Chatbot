import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    name: {
      type: String,
      required: [true, "Tour name is required"],
      trim: true,
    },
    artifacts: [
      {
        artifact: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artifact",
        },
        visitedAt: {
          type: Date,
          default: Date.now,
        },
        timeSpent: {
          type: Number, // in seconds
          default: 0,
        },
      },
    ],
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    duration: {
      type: Number, // in minutes
      default: 0,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "abandoned"],
      default: "in-progress",
    },
    interactionCount: {
      type: Number,
      default: 0,
    },
    chatMessages: [
      {
        message: String,
        response: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
tourSchema.index({ user: 1, createdAt: -1 });
tourSchema.index({ status: 1 });

// Calculate duration on completion
tourSchema.pre("save", function (next) {
  if (this.completedAt && this.startedAt) {
    this.duration = Math.round(
      (this.completedAt - this.startedAt) / (1000 * 60)
    );
  }
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
