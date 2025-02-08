const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    imageUrl: { type: String }, // URL of the uploaded image
    isPublished: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Handle author as a User reference
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
