const express = require("express");
const {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  addReview,
} = require("../controllers/vendorController");

const router = express.Router();

// Route to create a new vendor
router.post("/create", createVendor);

// Route to fetch all vendors
router.get("/", getAllVendors);

// Route to fetch a single vendor by ID
router.get("/:id", getVendorById);

// Route to update a vendor
router.put("/:id", updateVendor);

// Route to delete a vendor
router.delete("/:id", deleteVendor);

// Route to add a review to a vendor
router.post("/:id/reviews", addReview);

module.exports = router;
