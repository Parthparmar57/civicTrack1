const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
    getDashboardStats,
    getAllUsers,
    changeUserRole,
    deleteUser,
    getAllTasksAdmin,
    updateTaskStatus,
    deleteTask,
} = require("../controllers/admin.controller");

// 🔐 ALL ADMIN ONLY
router.use(authMiddleware, adminMiddleware);

// 📊 Dashboard
router.get("/dashboard", getDashboardStats);

// 👥 Users
router.get("/users", getAllUsers);
router.patch("/users/:id/role", changeUserRole);
router.delete("/users/:id", deleteUser);

// 📝 Tasks
router.get("/tasks", getAllTasksAdmin);
router.patch("/tasks/:id/status", updateTaskStatus);
router.delete("/tasks/:id", deleteTask);

module.exports = router;