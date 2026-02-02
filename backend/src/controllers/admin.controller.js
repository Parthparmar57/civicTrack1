const User = require("../models/User.model");
const Task = require("../models/Task.model");

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Admin Only
 */
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: "pending" });
        const inProgressTasks = await Task.countDocuments({ status: "in-progress" });
        const completedTasks = await Task.countDocuments({ status: "completed" });

        // Calculate activity for last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const activity = await Task.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const recentTasks = await Task.find()
            .sort("-createdAt")
            .limit(5)
            .select("title createdAt status area");

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
                activity,
                recentTasks
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Admin Only
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort("-createdAt");
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Change user role
 * @route   PATCH /api/admin/users/:id/role
 * @access  Admin Only
 */
exports.changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!["USER", "ADMIN"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Admin Only
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all tasks (Admin view)
 * @route   GET /api/admin/tasks
 * @access  Admin Only
 */
exports.getAllTasksAdmin = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("user", "name email")
            .sort("-createdAt");
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update task status
 * @route   PATCH /api/admin/tasks/:id/status
 * @access  Admin Only
 */
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate("user", "name email");

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/admin/tasks/:id
 * @access  Admin Only
 */
exports.deleteTask = async (req, res) => {
    console.log("Admin deleting task:", req.params.id);
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
