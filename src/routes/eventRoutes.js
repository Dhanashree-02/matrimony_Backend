const express = require("express");
const {
  createEvent,
  getAllEvents ,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const upload = require("../middlewares/fileUploader");

const eventRouter = express.Router();

// Create Event (accepts images & form data)
eventRouter.post("/create", upload.array("imageUrls", 5), createEvent);

// Get all Events
eventRouter.get("/", getAllEvents); // ✅ Now correctly defined

// Get Event by ID
eventRouter.get("/:id", getEventById);

// Update Event (accepts images & form data)
eventRouter.put("/:id", upload.array("imageUrls", 15), updateEvent);

// Delete Event
eventRouter.delete("/:id", deleteEvent);

module.exports = eventRouter;