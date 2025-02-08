const Attendees = require("../models/Attendees.js");
const cloudinary = require('../utils/cloudinary.js');  // Assuming cloudinary is used for image upload

// Create a new attendee
exports.createAttendee = async (req, res) => {
  try {
    // Ensure images are uploaded
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "attendees",
        });
        imageUrls.push(result.secure_url);
      }
    }

    // Create new attendee
    const newAttendee = new Attendees({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      imageUrls: imageUrls, // Store uploaded images
    });

    // Save to DB
    await newAttendee.save();
    res.status(201).json({ message: "Attendee created successfully", attendee: newAttendee });
  } catch (error) {
    console.error("Error creating attendee:", error);
    res.status(500).json({ message: "Error creating attendee", error });
  }
};

// Get all attendees
exports.getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendees.find();
    res.status(200).json({ attendees });
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ message: 'Error fetching attendees', error });
  }
};

// Get attendee by ID
exports.getAttendeeById = async (req, res) => {
  try {
    const attendee = await Attendees.findById(req.params.id);
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json({ attendee });
  } catch (error) {
    console.error('Error fetching attendee:', error);
    res.status(500).json({ message: 'Error fetching attendee', error });
  }
};

// Update attendee by ID
exports.updateAttendee = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // Handle updated images if any
    if (req.files && req.files["imageUrls"]) {
      const newImageUrls = [];
      for (let i = 0; i < req.files["imageUrls"].length; i++) {
        const result = await cloudinary.uploader.upload(req.files["imageUrls"][i].path, {
          folder: "attendees",  // Cloudinary folder
        });
        newImageUrls.push(result.secure_url);
      }
      updatedData.imageUrls = newImageUrls;  // Update image URLs if new images are uploaded
    }

    // Find and update attendee
    const attendee = await Attendees.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    res.status(200).json({ message: 'Attendee updated successfully', attendee });
  } catch (error) {
    console.error('Error updating attendee:', error);
    res.status(500).json({ message: 'Error updating attendee', error });
  }
};

// Delete attendee by ID
exports.deleteAttendee = async (req, res) => {
  try {
    const attendee = await Attendees.findByIdAndDelete(req.params.id);
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendee:', error);
    res.status(500).json({ message: 'Error deleting attendee', error });
  }
};
