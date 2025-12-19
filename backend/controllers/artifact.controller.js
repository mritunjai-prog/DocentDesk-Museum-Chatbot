import Artifact from "../models/Artifact.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get all artifacts
// @route   GET /api/artifacts
// @access  Public
export const getArtifacts = asyncHandler(async (req, res, next) => {
  const { category, search, sort, page = 1, limit = 12 } = req.query;

  // Build query
  let query = { isPublished: true };

  // Filter by category
  if (category && category !== "All") {
    query.category = category;
  }

  // Search
  if (search) {
    query.$text = { $search: search };
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Sort
  let sortOption = { createdAt: -1 };
  if (sort === "popular") sortOption = { viewCount: -1 };
  if (sort === "likes") sortOption = { likeCount: -1 };
  if (sort === "title") sortOption = { title: 1 };

  const artifacts = await Artifact.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit))
    .select("-__v");

  const total = await Artifact.countDocuments(query);

  res.status(200).json({
    success: true,
    count: artifacts.length,
    total,
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    data: artifacts,
  });
});

// @desc    Get single artifact
// @route   GET /api/artifacts/:id
// @access  Public
export const getArtifact = asyncHandler(async (req, res, next) => {
  const artifact = await Artifact.findById(req.params.id)
    .populate("relatedArtifacts", "title imageUrl category")
    .populate("curator", "name avatar");

  if (!artifact) {
    return next(
      new ErrorResponse(`Artifact not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: artifact,
  });
});

// @desc    Create new artifact
// @route   POST /api/artifacts
// @access  Private (Admin/Moderator)
export const createArtifact = asyncHandler(async (req, res, next) => {
  req.body.curator = req.user.id;

  const artifact = await Artifact.create(req.body);

  res.status(201).json({
    success: true,
    data: artifact,
  });
});

// @desc    Update artifact
// @route   PUT /api/artifacts/:id
// @access  Private (Admin/Moderator)
export const updateArtifact = asyncHandler(async (req, res, next) => {
  let artifact = await Artifact.findById(req.params.id);

  if (!artifact) {
    return next(
      new ErrorResponse(`Artifact not found with id of ${req.params.id}`, 404)
    );
  }

  artifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: artifact,
  });
});

// @desc    Delete artifact
// @route   DELETE /api/artifacts/:id
// @access  Private (Admin)
export const deleteArtifact = asyncHandler(async (req, res, next) => {
  const artifact = await Artifact.findById(req.params.id);

  if (!artifact) {
    return next(
      new ErrorResponse(`Artifact not found with id of ${req.params.id}`, 404)
    );
  }

  await artifact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Artifact deleted successfully",
  });
});

// @desc    Get featured artifacts
// @route   GET /api/artifacts/featured
// @access  Public
export const getFeaturedArtifacts = asyncHandler(async (req, res, next) => {
  const artifacts = await Artifact.find({ isFeatured: true, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .select("-__v");

  res.status(200).json({
    success: true,
    count: artifacts.length,
    data: artifacts,
  });
});

// @desc    Increment artifact views
// @route   POST /api/artifacts/:id/view
// @access  Public
export const incrementViews = asyncHandler(async (req, res, next) => {
  const artifact = await Artifact.findById(req.params.id);

  if (!artifact) {
    return next(
      new ErrorResponse(`Artifact not found with id of ${req.params.id}`, 404)
    );
  }

  await artifact.incrementViews();

  res.status(200).json({
    success: true,
    message: "View count incremented",
  });
});

// @desc    Like artifact
// @route   POST /api/artifacts/:id/like
// @access  Private
export const likeArtifact = asyncHandler(async (req, res, next) => {
  const artifact = await Artifact.findById(req.params.id);

  if (!artifact) {
    return next(
      new ErrorResponse(`Artifact not found with id of ${req.params.id}`, 404)
    );
  }

  artifact.likeCount += 1;
  await artifact.save();

  res.status(200).json({
    success: true,
    message: "Artifact liked",
    likeCount: artifact.likeCount,
  });
});
