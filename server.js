const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Port from environment variables or default to 8000
const PORT = process.env.PORT || 3000;

// Database connection
connectDB()
  .then(() => {
    console.log("Database connected successfully.");


    // Create the server
    const server = http.createServer(app);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on Port :  ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit the application if DB connection fails
  });
