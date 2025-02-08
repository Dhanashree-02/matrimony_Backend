const Sanchalak = require("../models/Sanchalak");

// Create a new Sanchalak
exports.createSanchalak = async (req, res) => {
  try {
    const { name, designation, phone, email, bio, birthData, place, work } = req.body;

    // Check and parse the work field
    const parsedWork = Array.isArray(work) ? work : work ? JSON.parse(work) : [];

    const newSanchalak = new Sanchalak({
      name,
      designation,
      phone,
      email,
      bio,
      birthData,
      place,
      work: parsedWork,
    });

    const savedSanchalak = await newSanchalak.save();

    res.status(201).json({
      success: true,
      message: "Sanchalak created successfully.",
      data: savedSanchalak,
    });
  } catch (error) {
    console.error("Error creating Sanchalak:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get all Sanchalaks
exports.getAllSanchalaks = async (req, res) => {
  try {
    const sanchalaks = await Sanchalak.find();
    res.status(200).json({
      success: true,
      message: "Sanchalaks fetched successfully.",
      data: sanchalaks,
    });
  } catch (error) {
    console.error("Error fetching Sanchalaks:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get a single Sanchalak by ID
exports.getSanchalakById = async (req, res) => {
  try {
    const { id } = req.params;
    const sanchalak = await Sanchalak.findById(id);

    if (!sanchalak) {
      return res.status(404).json({
        success: false,
        message: "Sanchalak not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sanchalak fetched successfully.",
      data: sanchalak,
    });
  } catch (error) {
    console.error("Error fetching Sanchalak:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update a Sanchalak
exports.updateSanchalak = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, phone, email, bio, birthData, place, work } = req.body;

    // Check and parse the work field
    const parsedWork = Array.isArray(work) ? work : work ? JSON.parse(work) : undefined;

    const updatedSanchalak = await Sanchalak.findByIdAndUpdate(
      id,
      {
        name,
        designation,
        phone,
        email,
        bio,
        birthData,
        place,
        ...(parsedWork && { work: parsedWork }), // Only update work if provided
      },
      { new: true, runValidators: true }
    );

    if (!updatedSanchalak) {
      return res.status(404).json({
        success: false,
        message: "Sanchalak not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sanchalak updated successfully.",
      data: updatedSanchalak,
    });
  } catch (error) {
    console.error("Error updating Sanchalak:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete a Sanchalak
exports.deleteSanchalak = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSanchalak = await Sanchalak.findByIdAndDelete(id);

    if (!deletedSanchalak) {
      return res.status(404).json({
        success: false,
        message: "Sanchalak not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sanchalak deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting Sanchalak:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
