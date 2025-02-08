const mongoose = require("mongoose");

const AttendeesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true }, // Ensure phone is required
    email: { type: String, required: true }, // Ensure email is required
    imageUrls: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendees", AttendeesSchema);