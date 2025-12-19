import Event from "../models/Event.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = asyncHandler(async (req, res, next) => {
  const { category, date, search, page = 1, limit = 10 } = req.query;

  let query = { isPublished: true, isCancelled: false };

  if (category) query.category = category;
  if (search) query.$text = { $search: search };
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    query.date = { $gte: startDate, $lt: endDate };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const events = await Event.find(query)
    .sort({ date: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .select("-__v");

  const total = await Event.countDocuments(query);

  res.status(200).json({
    success: true,
    count: events.length,
    total,
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    data: events,
  });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate(
    "organizer",
    "name avatar"
  );

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin/Moderator)
export const createEvent = asyncHandler(async (req, res, next) => {
  req.body.organizer = req.user.id;

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event,
  });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin/Moderator)
export const updateEvent = asyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
export const deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});

// @desc    Get featured events
// @route   GET /api/events/featured
// @access  Public
export const getFeaturedEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({
    isFeatured: true,
    isPublished: true,
    isCancelled: false,
    date: { $gte: new Date() },
  })
    .sort({ date: 1 })
    .limit(6)
    .select("-__v");

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});
