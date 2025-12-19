import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.model.js";
import Artifact from "../models/Artifact.model.js";
import Tour from "../models/Tour.model.js";

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select("-password -resetPasswordToken -resetPasswordExpire")
    .populate("savedArtifacts", "title imageUrl category");

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    avatar: req.body.avatar,
    language: req.body.language,
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(
    (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select("-password -resetPasswordToken -resetPasswordExpire");

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Get saved artifacts
// @route   GET /api/users/me/collection
// @access  Private
export const getSavedArtifacts = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "savedArtifacts",
    select: "title description imageUrl category era origin",
    match: { isPublished: true },
  });

  res.status(200).json({
    success: true,
    count: user.savedArtifacts.length,
    data: user.savedArtifacts,
  });
});

// @desc    Add artifact to saved collection
// @route   POST /api/users/me/collection/:artifactId
// @access  Private
export const addSavedArtifact = asyncHandler(async (req, res, next) => {
  const { artifactId } = req.params;

  // Check if artifact exists
  const artifact = await Artifact.findById(artifactId);
  if (!artifact) {
    return next(new ErrorResponse("Artifact not found", 404));
  }

  const user = await User.findById(req.user.id);

  // Check if already saved
  if (user.savedArtifacts.includes(artifactId)) {
    return next(new ErrorResponse("Artifact already in collection", 400));
  }

  user.savedArtifacts.push(artifactId);
  await user.save();

  await user.populate("savedArtifacts", "title imageUrl category");

  res.status(200).json({
    success: true,
    message: "Artifact added to collection",
    data: user.savedArtifacts,
  });
});

// @desc    Remove artifact from saved collection
// @route   DELETE /api/users/me/collection/:artifactId
// @access  Private
export const removeSavedArtifact = asyncHandler(async (req, res, next) => {
  const { artifactId } = req.params;

  const user = await User.findById(req.user.id);

  // Check if artifact is in collection
  if (!user.savedArtifacts.includes(artifactId)) {
    return next(new ErrorResponse("Artifact not in collection", 400));
  }

  user.savedArtifacts = user.savedArtifacts.filter(
    (id) => id.toString() !== artifactId
  );
  await user.save();

  await user.populate("savedArtifacts", "title imageUrl category");

  res.status(200).json({
    success: true,
    message: "Artifact removed from collection",
    data: user.savedArtifacts,
  });
});

// @desc    Get tour history
// @route   GET /api/users/me/tours
// @access  Private
export const getTourHistory = asyncHandler(async (req, res, next) => {
  const tours = await Tour.find({ user: req.user.id })
    .populate("artifacts.artifact", "title imageUrl category")
    .sort("-createdAt")
    .limit(20);

  res.status(200).json({
    success: true,
    count: tours.length,
    data: tours,
  });
});

// @desc    Update user preferences
// @route   PUT /api/users/me/preferences
// @access  Private
export const updatePreferences = asyncHandler(async (req, res, next) => {
  const { theme, notifications } = req.body;

  const user = await User.findById(req.user.id);

  if (theme) {
    user.preferences.theme = theme;
  }

  if (notifications) {
    user.preferences.notifications = {
      ...user.preferences.notifications,
      ...notifications,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    data: user.preferences,
  });
});

// @desc    Delete user account
// @route   DELETE /api/users/me
// @access  Private
export const deleteAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // Soft delete - mark as inactive
  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Account deactivated successfully",
  });
});
