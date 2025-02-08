const mongoose = require("mongoose");

const BrideGroomSchema = new mongoose.Schema(
  {
    // Registration Details
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },

    // Personal Details
    maritalStatus: { type: String }, // e.g., Single, Divorced
    noOfChildren: { type: Number, default: 0 },
    height: { type: String }, // e.g., 5'8"
    bodyType: { type: String }, // e.g., Slim, Athletic
    weight: { type: String }, // e.g., 65kg
    complexion: { type: String }, // e.g., Fair, Wheatish
    bloodGroup: { type: String }, // e.g., O+, AB-
    smoke: { type: Boolean, default: false },
    drink: { type: Boolean, default: false },
    specialCase: { type: String }, // e.g., None, Disability

    // Education and Career Details
    educationLevel: { type: String }, // e.g., Graduate, Postgraduate
    educationField: { type: String }, // e.g., Engineering, Arts
    educationDescription: { type: String },
    occupation: { type: String }, // e.g., Software Engineer
    occupationDescription: { type: String },
    companyName: { type: String },
    residencyStatus: { type: String }, // e.g., Citizen, PR
    annualIncome: { type: String }, // e.g., 10 LPA

    // Family Information
    fatherName: { type: String },
    fatherOccupation: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    brothers: { type: Number, default: 0 },
    sisters: { type: Number, default: 0 },
    culturalValues: { type: String }, // e.g., Traditional, Moderate
    aboutFamily: { type: String },

    // Patrika / Astrology Details
    motherTongue: { type: String },
    religion: { type: String },
    timeOfBirth: { type: String },
    cityOfBirth: { type: String },
    isManglik: { type: Boolean, default: false },
    gotra: { type: String },
    ras: { type: String },
    gan: { type: String },
    nadi: { type: String },
    charan: { type: String },

    // Ideal Partner Preferences
    partnerAgeFrom: { type: Number },
    partnerAgeTo: { type: Number },
    partnerEducation: { type: String },
    partnerLocation: { type: String },
    partnerPackage: { type: String }, // e.g., 12 LPA
    partnerAbout: { type: String },

    // Final Step Details
    profilePhoto: { type: String }, // URL for photo (Cloudinary)
    panCardNumber: { type: String },
    companyId: { type: String },
    aadharNumber: { type: String },
    aadharPhoto: { type: String }, // URL for photo (Cloudinary)
    passportNumber: { type: String },
    socialFacebook: { type: String },
    socialInstagram: { type: String },
    socialLinkedIn: { type: String },

    // Metadata
    isApproved: { type: Boolean, default: false }, // For admin approval
  },
  { timestamps: true }
);

module.exports = mongoose.model("BrideGroom", BrideGroomSchema);
