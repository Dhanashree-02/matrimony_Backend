// const { v2: cloudinary } = require('cloudinary');
// const fs = require("fs");

// // Configuration
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null; // Fixed: if (!localFilePath) instead of if (localFilePath)

//         const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
//         console.log("File is uploaded on Cloudinary!", response.url);
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         return null;
//     }
// };

// module.exports = { uploadOnCloudinary };