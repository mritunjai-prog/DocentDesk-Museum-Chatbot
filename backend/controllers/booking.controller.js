import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Booking from "../models/Booking.model.js";
import Event from "../models/Event.model.js";
import QRCode from "qrcode";
import sendEmail from "../utils/sendEmail.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = asyncHandler(async (req, res, next) => {
  const {
    event: eventId,
    tickets,
    contactDetails,
    addOns,
    specialRequests,
  } = req.body;

  // Check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    return next(new ErrorResponse("Event not found", 404));
  }

  // Check if event is published and not cancelled
  if (!event.isPublished || event.isCancelled) {
    return next(
      new ErrorResponse("This event is not available for booking", 400)
    );
  }

  // Check if event is in the past
  if (new Date(event.date) < new Date()) {
    return next(new ErrorResponse("Cannot book past events", 400));
  }

  // Calculate total tickets
  const totalTickets = Object.values(tickets).reduce(
    (sum, ticket) => sum + (ticket.quantity || 0),
    0
  );

  // Check if there are enough seats
  if (totalTickets > event.availableSeats) {
    return next(
      new ErrorResponse(
        `Only ${event.availableSeats} seats available for this event`,
        400
      )
    );
  }

  // Create booking
  const booking = await Booking.create({
    user: req.user.id,
    event: eventId,
    tickets,
    contactDetails,
    addOns,
    specialRequests,
    currency: event.price.currency,
  });

  // Calculate totals
  await booking.calculateTotals();

  // Generate QR code
  const qrCodeData = JSON.stringify({
    bookingReference: booking.bookingReference,
    eventId: eventId,
    eventTitle: event.title,
    date: event.date,
    tickets: totalTickets,
    userName: contactDetails.name,
  });

  const qrCode = await QRCode.toDataURL(qrCodeData);
  booking.qrCode = qrCode;
  await booking.save();

  // Update event available seats
  await event.updateAvailableSeats();

  // Populate event details
  await booking.populate("event", "title date time location venue imageUrl");

  // Send confirmation email
  try {
    const emailHtml = `
      <h1>Booking Confirmation</h1>
      <p>Dear ${contactDetails.name},</p>
      <p>Your booking has been confirmed!</p>
      <h2>Booking Details</h2>
      <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
      <p><strong>Event:</strong> ${event.title}</p>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Total Amount:</strong> ${booking.currency} ${
      booking.totalAmount
    }</p>
      <p><strong>Total Tickets:</strong> ${booking.totalTickets}</p>
      <br>
      <p>Please present this QR code at the venue:</p>
      <img src="${qrCode}" alt="QR Code" />
      <br>
      <p>Thank you for booking with DocentDesk Museum!</p>
    `;

    await sendEmail({
      to: contactDetails.email,
      subject: `Booking Confirmation - ${event.title}`,
      html: emailHtml,
    });
  } catch (emailError) {
    console.error("Failed to send booking confirmation email:", emailError);
    // Don't fail the booking if email fails
  }

  res.status(201).json({
    success: true,
    data: booking,
  });
});

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;

  const query = {};

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Filter by event
  if (req.query.event) {
    query.event = req.query.event;
  }

  // Filter by payment status
  if (req.query.paymentStatus) {
    query.paymentStatus = req.query.paymentStatus;
  }

  const total = await Booking.countDocuments(query);
  const bookings = await Booking.find(query)
    .populate("user", "name email avatar")
    .populate("event", "title date time location imageUrl")
    .sort("-createdAt")
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: bookings.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: bookings,
  });
});

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getUserBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("event", "title date time location venue imageUrl")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate("user", "name email phone avatar")
    .populate(
      "event",
      "title description date time location venue imageUrl price"
    );

  if (!booking) {
    return next(new ErrorResponse("Booking not found", 404));
  }

  // Make sure user is booking owner or admin
  if (
    booking.user._id.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse("Not authorized to access this booking", 403)
    );
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse("Booking not found", 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Not authorized to cancel this booking", 403)
    );
  }

  // Check if booking is already cancelled
  if (booking.status === "cancelled" || booking.status === "refunded") {
    return next(new ErrorResponse("Booking is already cancelled", 400));
  }

  // Update booking status
  booking.status = "cancelled";
  booking.cancellationReason = req.body.reason || "Cancelled by user";

  // Calculate refund amount (full refund if cancelled 24 hours before event)
  const event = await Event.findById(booking.event);
  const hoursUntilEvent =
    (new Date(event.date) - new Date()) / (1000 * 60 * 60);

  if (hoursUntilEvent > 24) {
    booking.refundAmount = booking.totalAmount;
    booking.status = "refunded";
  } else if (hoursUntilEvent > 12) {
    booking.refundAmount = booking.totalAmount * 0.5; // 50% refund
  } else {
    booking.refundAmount = 0; // No refund
  }

  await booking.save();

  // Update event available seats
  await event.updateAvailableSeats();

  // Send cancellation email
  try {
    const emailHtml = `
      <h1>Booking Cancellation</h1>
      <p>Dear ${booking.contactDetails.name},</p>
      <p>Your booking has been cancelled.</p>
      <h2>Booking Details</h2>
      <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
      <p><strong>Event:</strong> ${event.title}</p>
      <p><strong>Refund Amount:</strong> ${booking.currency} ${booking.refundAmount}</p>
      <p><strong>Reason:</strong> ${booking.cancellationReason}</p>
      <br>
      <p>The refund will be processed within 5-7 business days.</p>
      <p>Thank you for your understanding.</p>
    `;

    await sendEmail({
      to: booking.contactDetails.email,
      subject: `Booking Cancelled - ${event.title}`,
      html: emailHtml,
    });
  } catch (emailError) {
    console.error("Failed to send cancellation email:", emailError);
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});
