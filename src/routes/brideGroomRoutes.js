const express = require("express");
const {
    uploadProfilePhoto,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
} = require("../controllers/brideGroomController");
const upload = require("../middlewares/fileUploader");

const bgrouter = express.Router();

// Route for creating bride/groom profiles with file upload
bgrouter.post("/create", uploadProfilePhoto);
bgrouter.get("/", getAllProfiles);
bgrouter.get("/:id", getProfileById);
bgrouter.put("/:id", updateProfile);
bgrouter.delete("/:id", deleteProfile);

module.exports = bgrouter;
