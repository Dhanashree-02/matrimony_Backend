const mongoose = require("mongoose");

const SanchalakSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String }, // URL for the profile picture
    bio: { type: String }, // Short biography about the Sanchalak

    // New fields added
    address: { type: String }, // Address of the Sanchalak
    birthData: { type: Date, required: true }, // Birthdate
    place: { type: String, required: true }, // Place of birth or residence
    age: {
      type: Number,
      required: true,
      default: function () {
        return new Date().getFullYear() - new Date(this.birthData).getFullYear();
      }
    }, // Age of the Sanchalak, calculated from birthData

    description: { type: String }, // A detailed description of the Sanchalak
    education: { type: String }, // Education background of the Sanchalak
    role: { type: String }, // Role or position of the Sanchalak
    achievements: { type: [String] }, // List of achievements

    // Social media links
    socialLinks: {
      facebook: { type: String }, // Facebook profile link
      instagram: { type: String }, // Instagram profile link
      twitter: { type: String }, // Twitter profile link
    },

    // Work Details as an Array
    work: [
      {
        title: { type: String, required: true }, // Title of the work
        description: { type: String, required: true }, // Description of the work
        image: { type: String }, // URL to the work image
        feedback: { type: String }, // Feedback or review of the work
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Sanchalak", SanchalakSchema);
