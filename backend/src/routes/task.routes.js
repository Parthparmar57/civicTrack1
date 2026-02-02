const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/task.controller.js");

const authMiddleware = require("../middleware/auth.middleware.js");
const adminMiddleware = require("../middleware/admin.middleware.js");
const { getTaskStatusHistory } = require("../controllers/taskStatusLog.controller.js");

// express-validator imports
const { body } = require("express-validator");
const handleValidationErrors = require("../middleware/handleValidationErrors.middleware.js");
const upload = require("../middleware/upload.middleware.js");
// 🔒 PROTECTED ROUTES

// Create task (with validation) - Publicly reportable by any authenticated user
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("category").notEmpty().withMessage("Category is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("area").notEmpty().withMessage("Area is required"),
    body("pincode").notEmpty().withMessage("Pincode is required")
  ],
  handleValidationErrors,
  createTask
);

// Get all tasks
router.get("/", authMiddleware, getAllTasks);

// Get task by id
router.get("/:id", authMiddleware, getTaskById);

// Update task (with validation)
router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 5),
  [
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("status").optional().isIn(["pending", "in-progress", "completed"]).withMessage("Invalid status")
  ],
  handleValidationErrors,
  updateTask
);

// Delete task (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteTask);

// Get task status history
router.get("/:taskId/history", authMiddleware, getTaskStatusHistory);

module.exports = router;
