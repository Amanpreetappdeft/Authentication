
require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all origins dynamically with credentials support
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(express.json());

// Backend health checks for Railway / monitoring
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

// Authentication & Task routes (supports both /api/* and /* for compatibility)
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/tasks", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start listening on 0.0.0.0 immediately so Railway health checks pass instantly
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
  // Connect to MongoDB asynchronously without blocking server readiness
  connectDB().catch((err) => {
    console.error("MongoDB initial connection error:", err.message);
  });
});

module.exports = app;
