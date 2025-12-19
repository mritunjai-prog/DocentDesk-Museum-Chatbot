import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Artifact title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Art",
        "Sculpture",
        "History",
        "Pottery",
        "Artifact",
        "Painting",
        "Jewelry",
        "Textile",
        "Other",
      ],
    },
    era: {
      type: String,
      required: [true, "Era is required"],
      trim: true,
    },
    origin: {
      type: String,
      required: [true, "Origin is required"],
      trim: true,
    },
    yearDiscovered: {
      type: Number,
    },
    material: {
      type: String,
      trim: true,
    },
    dimensions: {
      height: Number,
      width: Number,
      depth: Number,
      unit: {
        type: String,
        enum: ["cm", "in", "m"],
        default: "cm",
      },
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    images: [
      {
        url: String,
        caption: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    audioGuideUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    position3D: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 },
    },
    modelUrl: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    relatedArtifacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artifact",
      },
    ],
    curator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    translations: {
      type: Map,
      of: {
        title: String,
        description: String,
        shortDescription: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
artifactSchema.index({ title: "text", description: "text", tags: "text" });
artifactSchema.index({ category: 1, isFeatured: -1 });
artifactSchema.index({ createdAt: -1 });

// Virtual for feedback
artifactSchema.virtual("feedback", {
  ref: "Feedback",
  localField: "_id",
  foreignField: "artifact",
  justOne: false,
});

// Method to increment view count
artifactSchema.methods.incrementViews = async function () {
  this.viewCount += 1;
  await this.save();
};

const Artifact = mongoose.model("Artifact", artifactSchema);

export default Artifact;
