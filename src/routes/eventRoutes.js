const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const upload = require("../middlewares/fileUploader"); // Import multer configuration

const eventRouter = express.Router();

// Create Event (with image upload)
eventRouter.post("/create", upload.array("imageUrls", 15), createEvent);

// Get All Events
eventRouter.get("/", getEvents);

// Get Event by ID
eventRouter.get("/:id", getEventById);

// Update Event (with image upload)
eventRouter.put("/:id", upload.array("imageUrls", 15), updateEvent);

// Delete Event
eventRouter.delete("/:id", deleteEvent);

module.exports = eventRouter;
