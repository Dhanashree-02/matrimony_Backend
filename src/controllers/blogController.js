const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
  return cloudinary.uploader.upload(fileBuffer, {
    resource_type: "auto", // Auto-detect the type (image or video)
    folder: "../uplods", // Folder in Cloudinary
  }).then(result => result.secure_url); // Return the secure URL
};

exports.createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: 0, message: "No image uploaded" });
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(req.file.buffer);

    // Create a new blog entry
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      imageUrl: imageUrl,
      createdBy: req.user ? req.user._id : null, // Handle user authentication if needed
    });

    // Save the blog
    await newBlog.save();

    // Send response
    res.status(201).json({ success: 1, blog: newBlog });
  } catch (error) {
    res.status(500).json({ success: 0, message: error.message });
  }
};


// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email"); // Populates author's details
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("createdBy", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully.",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, category, isPublished, createdBy } = req.body;

    // Extract uploaded file paths if new images are uploaded
    const imageUrls = req.files.map((file) => file.path);

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        author,
        category,
        ...(imageUrls.length && { imageUrl: imageUrls }), // Update images if provided
        isPublished,
        createdBy,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
