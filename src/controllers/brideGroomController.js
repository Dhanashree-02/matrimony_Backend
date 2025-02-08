const BrideGroom = require("../models/BrideGroom");

exports.uploadProfilePhoto = async (req, res) => {
  try {
    console.log("File:", req.file);
    console.log("Body:", req.body);

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    // Extract and validate data from the request body
    const {
      fullName,
      email,
      mobileNumber,
      password,
      dateOfBirth,
      city,
      gender,
      personalDetails,
      educationAndCareer,
      familyInformation,
      patrikaDetails,
      idealPartner,
    } = req.body;

    // Parse JSON fields safely
    let parsedPersonalDetails = {};
    let parsedEducationAndCareer = {};
    let parsedFamilyInformation = {};
    let parsedPatrikaDetails = {};
    let parsedIdealPartner = {};

    try {
      if (personalDetails) parsedPersonalDetails = JSON.parse(personalDetails);
      if (educationAndCareer) parsedEducationAndCareer = JSON.parse(educationAndCareer);
      if (familyInformation) parsedFamilyInformation = JSON.parse(familyInformation);
      if (patrikaDetails) parsedPatrikaDetails = JSON.parse(patrikaDetails);
      if (idealPartner) parsedIdealPartner = JSON.parse(idealPartner);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON data in one or more fields.",
      });
    }

    // Create a new BrideGroom document
    const newProfile = new BrideGroom({
      fullName,
      email,
      mobileNumber,
      password,
      dateOfBirth,
      city,
      gender,
      personalDetails: parsedPersonalDetails,
      educationAndCareer: parsedEducationAndCareer,
      familyInformation: parsedFamilyInformation,
      patrikaDetails: parsedPatrikaDetails,
      idealPartner: parsedIdealPartner,
      finalStepDetails: {
        profilePhoto: req.file.path, // Local file path
      },
    });

    // Save the profile to the database
    const savedProfile = await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Bride/Groom profile created successfully.",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
// Get All Bride/Groom Profiles
// exports.getAllProfiles = async (req, res) => {
//   try {
//     const profiles = await BrideGroom.find();
//     res.status(200).json({
//       success: true,
//       message: "Profiles fetched successfully.",
//       data: profiles,
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error.",
//     });
//   }
// };

// Get Bride/Groom Profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await BrideGroom.findById(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update Bride/Groom Profile
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      email,
      mobileNumber,
      password,
      dateOfBirth,
      city,
      gender,
      personalDetails,
      educationAndCareer,
      familyInformation,
      patrikaDetails,
      idealPartner,
    } = req.body;

    // Parse JSON fields if necessary
    let parsedPersonalDetails = personalDetails ? JSON.parse(personalDetails) : undefined;
    let parsedEducationAndCareer = educationAndCareer ? JSON.parse(educationAndCareer) : undefined;
    let parsedFamilyInformation = familyInformation ? JSON.parse(familyInformation) : undefined;
    let parsedPatrikaDetails = patrikaDetails ? JSON.parse(patrikaDetails) : undefined;
    let parsedIdealPartner = idealPartner ? JSON.parse(idealPartner) : undefined;

    // Find and update the profile
    const updatedProfile = await BrideGroom.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        mobileNumber,
        password,
        dateOfBirth,
        city,
        gender,
        ...(parsedPersonalDetails && { personalDetails: parsedPersonalDetails }),
        ...(parsedEducationAndCareer && { educationAndCareer: parsedEducationAndCareer }),
        ...(parsedFamilyInformation && { familyInformation: parsedFamilyInformation }),
        ...(parsedPatrikaDetails && { patrikaDetails: parsedPatrikaDetails }),
        ...(parsedIdealPartner && { idealPartner: parsedIdealPartner }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete Bride/Groom Profile
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await BrideGroom.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully.",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const genderFilter = req.query.gender;
    const query = genderFilter ? { gender: genderFilter } : {};
    const profiles = await BrideGroom.find(query);
    res.status(200).json({
      success: true,
      message: "Profiles fetched successfully.",
      data: profiles,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
