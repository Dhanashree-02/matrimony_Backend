const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// Configure Cloudinary Storage for multiple images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "attendees", // Cloudinary folder for images
    format: async (req, file) => file.mimetype.split("/")[1], // Dynamic format
    public_id: (req, file) => `attendee-${Date.now()}-${file.originalname}`, // Unique filename
  },
});

// Multer Upload Middleware (for multiple image uploads)
const upload = multer({ storage });

module.exports = upload;