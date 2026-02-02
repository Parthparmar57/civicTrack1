const TaskStatusLog = require("../models/TaskStatusLog.model");

exports.getTaskStatusHistory = async (req, res, next) => {
    try {
        const logs = await TaskStatusLog.find({
            task: req.params.taskId,
        })
            .populate("changedBy", "email")
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            message: "Task status history fetched successfully",
            data: logs,
        });
    } catch (err) {
        next(err);
    }
};
