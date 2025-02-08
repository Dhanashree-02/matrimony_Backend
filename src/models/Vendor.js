const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    title: { type: String },
    name: { type: String, required: true }, // Vendor name
    email: { type: String, required: true, unique: true }, // Vendor contact email
    phone: { type: String, required: true }, // Vendor contact phone
    address: { type: String, required: true }, // Vendor address
    services: {
      type: [String], // Array of services provided
      enum: ["Catering", "Photography", "Decoration", "DJ", "Makeup", "Other"],
    },
    profilePic: { type: String }, // URL to Cloudinary for vendor profile picture
    description: { type: String }, // Short description of the vendor
    isVerified: { type: Boolean, default: false }, // Verification status by admin
    ratings: { type: Number, default: 0 }, // Average vendor rating
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who gave the review
        comment: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ], // List of reviews
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
