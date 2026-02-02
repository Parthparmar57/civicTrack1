const mongoose = require("mongoose");

const taskStatusLogSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
        oldStatus: {
            type: String,
            required: true,
        },
        newStatus: {
            type: String,
            required: true,
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.models.TaskStatusLog || mongoose.model("TaskStatusLog", taskStatusLogSchema);
