import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Workshop",
        "Exhibition",
        "Lecture",
        "Symposium",
        "Tour",
        "Performance",
        "Family Event",
        "Other",
      ],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    endDate: {
      type: Date,
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    duration: {
      type: Number, // in minutes
      required: [true, "Duration is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    venue: {
      name: String,
      address: String,
      city: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
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
      },
    ],
    price: {
      adult: {
        type: Number,
        required: [true, "Adult price is required"],
        min: 0,
      },
      child: {
        type: Number,
        default: 0,
        min: 0,
      },
      senior: {
        type: Number,
        default: 0,
        min: 0,
      },
      student: {
        type: Number,
        default: 0,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: 1,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    speakers: [
      {
        name: String,
        title: String,
        bio: String,
        photo: String,
      },
    ],
    highlights: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    ageRestriction: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
      },
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    bookingCount: {
      type: Number,
      default: 0,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    translations: {
      type: Map,
      of: {
        title: String,
        description: String,
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
eventSchema.index({ date: 1, category: 1 });
eventSchema.index({ title: "text", description: "text" });
eventSchema.index({ isFeatured: -1, date: 1 });

// Virtual for bookings
eventSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "event",
  justOne: false,
});

// Virtual to check if event is full
eventSchema.virtual("isFull").get(function () {
  return this.availableSeats <= 0;
});

// Virtual to check if event is past
eventSchema.virtual("isPast").get(function () {
  return new Date() > this.date;
});

// Method to update available seats
eventSchema.methods.updateAvailableSeats = async function (seats) {
  this.availableSeats -= seats;
  if (this.availableSeats < 0) this.availableSeats = 0;
  await this.save();
};

// Pre-save hook to initialize available seats
eventSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableSeats = this.capacity;
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
