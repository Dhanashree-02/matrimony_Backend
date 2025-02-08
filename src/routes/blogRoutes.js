// const express = require("express");
// const {
//     createBlog,
//     getAllBlogs,
//     getBlogById,
//     updateBlog,
//     deleteBlog,
// } = require("../controllers/blogController");

// const upload = require("../middlewares/fileUploader");

// const blogRouter = express.Router();

// // ✅ Use upload.fields() to ensure correct field name
// blogRouter.post("/create", upload, createBlog);
// blogRouter.put("/:id", upload, updateBlog);
// blogRouter.get("/", getAllBlogs);
// blogRouter.get("/:id", getBlogById);
// blogRouter.delete("/:id", deleteBlog);

// module.exports = blogRouter;
