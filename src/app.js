const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const routes = require("./routes"); // Import routes from the routes/index.js file
// const eventRouter = require("./routes/eventRoutes")

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors()); // Enable CORS for all requests
app.use(morgan("dev")); // Log requests in the development environment
app.use(helmet()); // Enhance security with HTTP headers

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1", routes);

// Default route for testing the server
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack to the console
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
