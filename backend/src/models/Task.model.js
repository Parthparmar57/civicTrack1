const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      required: true,
      default: "Pothole"
    },

    city: {
      type: String,
      required: true
    },

    area: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    },

    isAnonymous: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },

    images: {
      type: [String],
      default: []
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;
