const express = require("express");
const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const upload = require("../middlewares/fileUploader");

const newsRouter = express.Router();

// Routes
newsRouter.post("/create",  createNews);
newsRouter.get("/", getAllNews);
newsRouter.get("/:id", getNewsById);
newsRouter.put("/:id",  updateNews);
newsRouter.delete("/:id", deleteNews);

module.exports = newsRouter;
