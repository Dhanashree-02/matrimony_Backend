const Event = require("../models/Event");

// Create Event with Image Upload
exports.createEvent = async (req, res) => {
  try {
    let imageUrls = [];

    // Check if files exist and extract Cloudinary URLs
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => file.path); // ✅ Correct way to get Cloudinary URLs
    }

    // Create event
    const event = new Event({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      organizer: req.body.organizer,
      imageUrls, // Store Cloudinary image URLs
      attendees: req.body.attendees ? req.body.attendees.split(",") : [],
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("attendees");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("attendees");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Event with New Images
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    let imageUrls = event.imageUrls;

    // If new images are uploaded, replace the existing ones
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => file.path); // ✅ Cloudinary URLs
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imageUrls },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Event (Remove Images from Cloudinary)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Delete each image from Cloudinary
    for (let imageUrl of event.imageUrls) {
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract Cloudinary Public ID
      await cloudinary.uploader.destroy(publicId);
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
