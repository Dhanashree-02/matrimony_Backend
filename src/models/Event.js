const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    location: { type: String },
    organizer: { type: String },
    imageUrls: { type: [String] }, // For event images
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendees" }], // Reference to Attendees model
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);