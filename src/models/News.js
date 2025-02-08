const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String }, // URL to Cloudinary
    author: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
