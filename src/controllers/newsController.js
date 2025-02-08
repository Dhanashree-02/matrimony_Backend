const News = require("../models/News");

// Create a news article
exports.createNews = async (req, res) => {
  try {
    const { title, description, content, author, isPublished } = req.body;

    // File path if an image is uploaded
    const imageUrl = req.file ? req.file.path : null;

    const newNews = new News({
      title,
      description,
      content,
      author,
      isPublished,
      imageUrl,
    });

    const savedNews = await newNews.save();

    res.status(201).json({
      success: true,
      message: "News article created successfully.",
      data: savedNews,
    });
  } catch (error) {
    console.error("Error creating news article:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get all news articles
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      success: true,
      message: "News articles fetched successfully.",
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news articles:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get a single news article by ID
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "News article fetched successfully.",
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news article:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update a news article
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, author, isPublished } = req.body;

    // Update the image URL if a new file is uploaded
    const imageUrl = req.file ? req.file.path : undefined;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      {
        title,
        description,
        content,
        author,
        isPublished,
        ...(imageUrl && { imageUrl }), // Update imageUrl only if file is uploaded
      },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "News article updated successfully.",
      data: updatedNews,
    });
  } catch (error) {
    console.error("Error updating news article:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete a news article
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "News article deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting news article:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
