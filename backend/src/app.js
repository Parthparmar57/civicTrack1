const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require("./middleware/error.middleware");
const helmet = require("helmet");
const apiLimiter = require("./middleware/rateLimit.middleware");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
// ============ SECURITY MIDDLEWARES (MUST BE FIRST) ============
// Helmet - Security headers
app.use(helmet());

// CORS - Configure allowed origins
app.use(cors({
  origin: ["https://civic-track1.vercel.app/"], // frontend url
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Rate limiting - Prevent abuse
app.use("/api", apiLimiter);

// ============ BODY PARSING MIDDLEWARES ============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL injection (MUST BE AFTER BODY PARSING)
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// ============ ROUTES ============
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const adminRoutes = require("./routes/admin.routes");
// Test route

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

// ============ ERROR HANDLER (MUST BE LAST) ============
app.use(errorHandler);

module.exports = app;
