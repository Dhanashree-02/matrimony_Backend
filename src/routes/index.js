const express = require("express");
const brideGroomRoutes = require("./brideGroomRoutes");
// const blogRoutes = require("./blogRoutes");
const eventRoutes = require("./eventRoutes");
const newsRoutes = require("./newsRoutes");
const sanchalakRoutes = require("./sanchalakRoutes");
// const vendorRoutes = require("./vendorRoutes"); // Correct typo
const attendeeRouter = require ("./attendeeRouter")

const indexRouter = express.Router();

// Mount all routes
indexRouter.use("/bride-groom", brideGroomRoutes);
// indexRouter.use("/blogs", blogRoutes);
indexRouter.use("/events", eventRoutes);
indexRouter.use("/news", newsRoutes);
indexRouter.use("/sanchalak", sanchalakRoutes);
// indexRouter.use("/vendors", vendorRoutes);
indexRouter.use("/attendee", attendeeRouter);

// Default route for health check
indexRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

module.exports = indexRouter;
