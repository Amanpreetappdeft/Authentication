
require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Normalize and prepare allowed origins
const rawOrigins = [
  "http://localhost:3000",
  "https://authentication-frontend-orcin.vercel.app",
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
];

const allowedOrigins = rawOrigins
  .filter(Boolean)
  .flatMap((url) => url.split(","))
  .map((url) => url.trim().replace(/\/+$/, ""));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, Postman, server-side fetch)
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.trim().replace(/\/+$/, "");

    // Allow explicitly configured origins, any Vercel deployment/preview (*.vercel.app), or localhost
    const isAllowed =
      allowedOrigins.includes(cleanOrigin) ||
      /\.vercel\.app$/.test(cleanOrigin) ||
      /^https?:\/\/localhost(:\d+)?$/.test(cleanOrigin) ||
      /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(cleanOrigin);

    if (isAllowed) {
      return callback(null, true);
    }

    console.warn(`[CORS] Blocked request from unauthorized origin: ${origin}`);
    return callback(null, false);
  },
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

// Explicit preflight handler for all routes in Express 5
app.options(/(.*)/, cors(corsOptions));

// Parse incoming JSON requests
app.use(express.json());

// Backend health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
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

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Allowed frontend origins:", allowedOrigins);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
