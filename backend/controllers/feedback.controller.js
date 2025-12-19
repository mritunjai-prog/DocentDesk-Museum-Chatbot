import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Feedback from "../models/Feedback.model.js";
import Artifact from "../models/Artifact.model.js";
import Event from "../models/Event.model.js";
import Tour from "../models/Tour.model.js";

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Public
export const getFeedback = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;

  const query = { isPublished: true };

  // Filter by type
  if (req.query.type) {
    query.type = req.query.type;
  }

  // Filter by artifact
  if (req.query.artifact) {
    query.artifact = req.query.artifact;
  }

  // Filter by event
  if (req.query.event) {
    query.event = req.query.event;
  }

  // Filter by tour
  if (req.query.tour) {
    query.tour = req.query.tour;
  }

  // Filter by rating
  if (req.query.rating) {
    query.rating = parseInt(req.query.rating, 10);
  }

  const total = await Feedback.countDocuments(query);
  const feedback = await Feedback.find(query)
    .populate("user", "name avatar")
    .populate("artifact", "title imageUrl")
    .populate("event", "title imageUrl")
    .populate("tour", "name")
    .populate("reply.repliedBy", "name avatar")
    .sort("-createdAt")
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: feedback.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: feedback,
  });
});

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Private
export const createFeedback = asyncHandler(async (req, res, next) => {
  const { type, artifact, event, tour, rating, title, comment } = req.body;

  // Validate that at least one reference is provided
  if (!artifact && !event && !tour) {
    return next(
      new ErrorResponse(
        "Please provide artifact, event, or tour reference",
        400
      )
    );
  }

  // Check if resource exists
  if (artifact) {
    const artifactExists = await Artifact.findById(artifact);
    if (!artifactExists) {
      return next(new ErrorResponse("Artifact not found", 404));
    }
  }

  if (event) {
    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return next(new ErrorResponse("Event not found", 404));
    }
  }

  if (tour) {
    const tourExists = await Tour.findById(tour);
    if (!tourExists) {
      return next(new ErrorResponse("Tour not found", 404));
    }
  }

  // Check if user already provided feedback for this item
  const existingFeedback = await Feedback.findOne({
    user: req.user.id,
    ...(artifact && { artifact }),
    ...(event && { event }),
    ...(tour && { tour }),
  });

  if (existingFeedback) {
    return next(
      new ErrorResponse("You have already provided feedback for this item", 400)
    );
  }

  const feedback = await Feedback.create({
    user: req.user.id,
    type,
    artifact,
    event,
    tour,
    rating,
    title,
    comment,
  });

  await feedback.populate("user", "name avatar");

  res.status(201).json({
    success: true,
    data: feedback,
  });
});

// @desc    Update feedback
// @route   PUT /api/feedback/:id
// @access  Private
export const updateFeedback = asyncHandler(async (req, res, next) => {
  let feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found", 404));
  }

  // Make sure user is feedback owner
  if (feedback.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse("Not authorized to update this feedback", 403)
    );
  }

  const { rating, title, comment } = req.body;

  feedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    { rating, title, comment },
    {
      new: true,
      runValidators: true,
    }
  ).populate("user", "name avatar");

  res.status(200).json({
    success: true,
    data: feedback,
  });
});

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private
export const deleteFeedback = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found", 404));
  }

  // Make sure user is feedback owner or admin
  if (feedback.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Not authorized to delete this feedback", 403)
    );
  }

  await feedback.deleteOne();

  res.status(200).json({
    success: true,
    message: "Feedback deleted successfully",
  });
});

// @desc    Mark feedback as helpful
// @route   POST /api/feedback/:id/helpful
// @access  Private
export const markHelpful = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found", 404));
  }

  feedback.helpfulCount += 1;
  await feedback.save();

  res.status(200).json({
    success: true,
    data: feedback,
  });
});

// @desc    Report feedback
// @route   POST /api/feedback/:id/report
// @access  Private
export const reportFeedback = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found", 404));
  }

  feedback.reportCount += 1;

  // Auto-unpublish if reported too many times
  if (feedback.reportCount >= 5) {
    feedback.isPublished = false;
  }

  await feedback.save();

  res.status(200).json({
    success: true,
    message: "Feedback reported successfully",
  });
});

// @desc    Reply to feedback (Admin/Moderator)
// @route   PUT /api/feedback/:id/reply
// @access  Private/Admin/Moderator
export const replyToFeedback = asyncHandler(async (req, res, next) => {
  const { replyText } = req.body;

  if (!replyText) {
    return next(new ErrorResponse("Please provide a reply", 400));
  }

  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found", 404));
  }

  feedback.reply = {
    text: replyText,
    repliedBy: req.user.id,
    repliedAt: Date.now(),
  };

  await feedback.save();

  await feedback.populate([
    { path: "user", select: "name avatar" },
    { path: "reply.repliedBy", select: "name avatar" },
  ]);

  res.status(200).json({
    success: true,
    data: feedback,
  });
});
