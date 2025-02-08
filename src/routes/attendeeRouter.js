const express = require('express');
const { createAttendee, getAllAttendees, getAttendeeById, updateAttendee, deleteAttendee } = require('../controllers/attendeesController');
const upload = require('../middlewares/multer.middleware'); 

const attendeeRouter = express.Router();

// Event routes
attendeeRouter.post("/create", upload.array("imageUrls", 5), createAttendee); // Accept multiple images (max 5)

attendeeRouter.get('/', getAllAttendees);
attendeeRouter.get('/:id', getAttendeeById);
attendeeRouter.put('/:id', upload.single('imageUrls'), updateAttendee);
attendeeRouter.delete('/:id', deleteAttendee);

module.exports = attendeeRouter;