const Vendor = require("../models/Vendor");

// Create a new vendor
exports.createVendor = async (req, res) => {
  try {
    const { title,name, email, phone, address, services, profilePic, description } = req.body;

    const newVendor = new Vendor({
      title,
      name,
      email,
      phone,
      address,
      services,
      profilePic,
      description,
    });

    const savedVendor = await newVendor.save();

    res.status(201).json({
      success: true,
      message: "Vendor created successfully.",
      data: savedVendor,
    });
  } catch (error) {
    console.error("Error creating vendor:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({
      success: true,
      message: "Vendors fetched successfully.",
      data: vendors,
    });
  } catch (error) {
    console.error("Error fetching vendors:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get a vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor fetched successfully.",
      data: vendor,
    });
  } catch (error) {
    console.error("Error fetching vendor:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update a vendor
exports.updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, services, profilePic, description, isVerified } = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { name, email, phone, address, services, profilePic, description, isVerified },
      { new: true, runValidators: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor updated successfully.",
      data: updatedVendor,
    });
  } catch (error) {
    console.error("Error updating vendor:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVendor = await Vendor.findByIdAndDelete(id);

    if (!deletedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting vendor:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Add a review for a vendor
exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment, rating } = req.body;

    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    vendor.reviews.push({ user, comment, rating });

    // Recalculate average rating
    const totalRatings = vendor.reviews.reduce((sum, review) => sum + review.rating, 0);
    vendor.ratings = totalRatings / vendor.reviews.length;

    const updatedVendor = await vendor.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully.",
      data: updatedVendor,
    });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
