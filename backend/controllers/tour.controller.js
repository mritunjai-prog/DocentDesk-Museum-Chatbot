import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Tour from "../models/Tour.model.js";
import Artifact from "../models/Artifact.model.js";
import User from "../models/User.model.js";

// @desc    Start new tour
// @route   POST /api/tours
// @access  Private
export const startTour = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const tour = await Tour.create({
    user: req.user.id,
    name: name || "Virtual Tour",
    status: "in-progress",
  });

  res.status(201).json({
    success: true,
    data: tour,
  });
});

// @desc    Get tour details
// @route   GET /api/tours/:id
// @access  Private
export const getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id)
    .populate("user", "name avatar")
    .populate("artifacts.artifact", "title description imageUrl category era");

  if (!tour) {
    return next(new ErrorResponse("Tour not found", 404));
  }

  // Make sure user is tour owner
  if (tour.user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this tour", 403));
  }

  res.status(200).json({
    success: true,
    data: tour,
  });
});

// @desc    Update tour (add chat messages)
// @route   PUT /api/tours/:id
// @access  Private
export const updateTour = asyncHandler(async (req, res, next) => {
  let tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new ErrorResponse("Tour not found", 404));
  }

  // Make sure user is tour owner
  if (tour.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized to update this tour", 403));
  }

  const { chatMessages, interactionCount } = req.body;

  if (chatMessages) {
    tour.chatMessages.push(...chatMessages);
  }

  if (interactionCount) {
    tour.interactionCount = interactionCount;
  }

  await tour.save();

  res.status(200).json({
    success: true,
    data: tour,
  });
});

// @desc    Complete tour
// @route   POST /api/tours/:id/complete
// @access  Private
export const completeTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new ErrorResponse("Tour not found", 404));
  }

  // Make sure user is tour owner
  if (tour.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized to complete this tour", 403));
  }

  tour.status = "completed";
  tour.completedAt = Date.now();
  await tour.save();

  // Add tour to user's history
  const user = await User.findById(req.user.id);
  user.tourHistory.push({
    tour: tour._id,
    completedAt: tour.completedAt,
    artifactsVisited: tour.artifacts.length,
  });
  await user.save();

  res.status(200).json({
    success: true,
    data: tour,
  });
});

// @desc    Mark artifact as visited in tour
// @route   POST /api/tours/:id/artifact
// @access  Private
export const visitArtifact = asyncHandler(async (req, res, next) => {
  const { artifactId, timeSpent } = req.body;

  if (!artifactId) {
    return next(new ErrorResponse("Please provide artifact ID", 400));
  }

  // Check if artifact exists
  const artifact = await Artifact.findById(artifactId);
  if (!artifact) {
    return next(new ErrorResponse("Artifact not found", 404));
  }

  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new ErrorResponse("Tour not found", 404));
  }

  // Make sure user is tour owner
  if (tour.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized to update this tour", 403));
  }

  // Check if artifact already visited
  const existingVisit = tour.artifacts.find(
    (a) => a.artifact.toString() === artifactId
  );

  if (existingVisit) {
    // Update time spent
    existingVisit.timeSpent = (existingVisit.timeSpent || 0) + (timeSpent || 0);
  } else {
    // Add new visit
    tour.artifacts.push({
      artifact: artifactId,
      visitedAt: Date.now(),
      timeSpent: timeSpent || 0,
    });
  }

  tour.interactionCount += 1;
  await tour.save();

  await tour.populate("artifacts.artifact", "title imageUrl category");

  res.status(200).json({
    success: true,
    data: tour,
  });
});

// @desc    Get user's tours
// @route   GET /api/tours/my-tours
// @access  Private
export const getUserTours = asyncHandler(async (req, res, next) => {
  const tours = await Tour.find({ user: req.user.id })
    .populate("artifacts.artifact", "title imageUrl category")
    .sort("-createdAt")
    .limit(50);

  res.status(200).json({
    success: true,
    count: tours.length,
    data: tours,
  });
});
