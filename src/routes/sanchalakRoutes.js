const express = require("express");
const {
  createSanchalak,
  getAllSanchalaks,
  getSanchalakById,
  updateSanchalak,
  deleteSanchalak,
} = require("../controllers/sanchalakController");

const router = express.Router();

// Route to create a new Sanchalak
router.post("/create", createSanchalak);

// Route to fetch all Sanchalaks
router.get("/", getAllSanchalaks);

// Route to fetch a single Sanchalak by ID
router.get("/:id", getSanchalakById);

// Route to update a Sanchalak by ID
router.put("/:id", updateSanchalak);

// Route to delete a Sanchalak by ID
router.delete("/:id", deleteSanchalak);

module.exports = router;
