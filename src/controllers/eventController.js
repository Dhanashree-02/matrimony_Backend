const express = require("express");
const Event = require("../models/Event");
const upload = require("../middlewares/fileUploader"); // Import multer configuration
const cloudinary = require("../utils/cloudinary"); // Import cloudinary configuration

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location, organizer } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const newEvent = new Event({
      name,
      description,
      date,
      location,
      organizer,
      imageUrls,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { name, description, date, location, organizer } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, location, organizer, imageUrls },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};
