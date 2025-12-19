import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event is required"],
    },
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    tickets: {
      adult: {
        quantity: { type: Number, default: 0, min: 0 },
        price: { type: Number, default: 0 },
      },
      child: {
        quantity: { type: Number, default: 0, min: 0 },
        price: { type: Number, default: 0 },
      },
      senior: {
        quantity: { type: Number, default: 0, min: 0 },
        price: { type: Number, default: 0 },
      },
      student: {
        quantity: { type: Number, default: 0, min: 0 },
        price: { type: Number, default: 0 },
      },
    },
    totalTickets: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    contactDetails: {
      name: {
        type: String,
        required: [true, "Contact name is required"],
      },
      email: {
        type: String,
        required: [true, "Contact email is required"],
        lowercase: true,
      },
      phone: {
        type: String,
        required: [true, "Contact phone is required"],
      },
    },
    addOns: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    specialRequests: {
      type: String,
      maxlength: [500, "Special requests cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "refunded"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "stripe", "cash", "other"],
    },
    paymentId: {
      type: String,
    },
    qrCode: {
      type: String,
    },
    checkInTime: {
      type: Date,
    },
    cancellationReason: {
      type: String,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
bookingSchema.index({ user: 1, event: 1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ status: 1, createdAt: -1 });

// Generate booking reference
bookingSchema.pre("save", function (next) {
  if (this.isNew) {
    const prefix = "DD";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.bookingReference = `${prefix}${timestamp}${random}`;
  }
  next();
});

// Calculate total tickets and amount
bookingSchema.methods.calculateTotals = function () {
  this.totalTickets =
    this.tickets.adult.quantity +
    this.tickets.child.quantity +
    this.tickets.senior.quantity +
    this.tickets.student.quantity;

  this.totalAmount =
    this.tickets.adult.quantity * this.tickets.adult.price +
    this.tickets.child.quantity * this.tickets.child.price +
    this.tickets.senior.quantity * this.tickets.senior.price +
    this.tickets.student.quantity * this.tickets.student.price;

  // Add add-ons cost
  if (this.addOns && this.addOns.length > 0) {
    this.totalAmount += this.addOns.reduce(
      (sum, addon) => sum + addon.price * addon.quantity,
      0
    );
  }
};

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
