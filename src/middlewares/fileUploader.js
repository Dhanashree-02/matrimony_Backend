const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // ✅ Import Cloudinary configuration

// Configure storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "events", // Folder in Cloudinary where images will be stored
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed file formats
    transformation: [{ width: 800, height: 600, crop: "limit" }], // Resize images
  },
});

// Multer setup
const upload = multer({ storage });

module.exports = upload;