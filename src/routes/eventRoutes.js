const express = require('express');
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const upload = require('../middlewares/fileUploader'); 

const eventRouter = express.Router();

// Event routes

eventRouter.post("/create", upload.array("imageUrls", 15), createEvent);

// eventRouter.post("/create", upload.array("images", 5), eventController.createEvent); // Allow up to 5 images


// eventRouter.get('/', getAllEvents);
// eventRouter.get('/:id', getEventById);
// eventRouter.put('/:id', upload.single('image'), updateEvent);
eventRouter.delete('/:id', deleteEvent);

module.exports = eventRouter;