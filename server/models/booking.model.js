import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: false },
    },
    bookingDetails: {
      budget: { type: Number, required: true },
      preferredDate: { type: Date, required: false },
      message: { type: String, required: false },
      specialRequirements: { type: String, required: false },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);

export default Booking;