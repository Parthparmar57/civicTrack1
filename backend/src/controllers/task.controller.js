const Task = require("../models/Task.model");
const TaskStatusLog = require("../models/TaskStatusLog.model");

// CREATE TASK
const createTask = async (req, res, next) => {
  try {
    console.log("--- CREATE TASK DEBUG ---");
    console.log("Body:", req.body);
    console.log("Files:", req.files ? req.files.length : 'No files');

    const { title, description, category, city, area, pincode, isAnonymous } = req.body;

    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      throw error;
    }

    const taskData = {
      title,
      description,
      category,
      city,
      area,
      pincode,
      isAnonymous: isAnonymous === "true" || isAnonymous === true,
      user: req.user.id
    };

    // Add Cloudinary image URLs if files were uploaded
    if (req.files && req.files.length > 0) {
      taskData.images = req.files.map(file => file.path); // Array of Cloudinary URLs
    }

    const task = await Task.create(taskData);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS
const getAllTasks = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, search, all } = req.query;

    // base filter (user security)
    let filter = { user: req.user.id };

    // ADMIN can see all tasks if they request it
    if (req.user.role === "ADMIN" && all === "true") {
      filter = {};
    }

    // status filter
    if (status) {
      filter.status = status;
    }

    // search filter
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalTasks = await Task.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      page,
      limit,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE TASK
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, title, description } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    // USER → can only update their own tasks
    if (
      req.user.role === "USER" &&
      task.user.toString() !== req.user.id
    ) {
      const error = new Error("Not allowed to update this task");
      error.statusCode = 403;
      throw error;
    }

    // status change log
    if (status && status !== task.status) {
      await TaskStatusLog.create({
        task: task._id,
        oldStatus: task.status,
        newStatus: status,
        changedBy: req.user.id,
      });

      task.status = status;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      task.images = [...task.images, ...newImages];
    }

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// GET TASK BY ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate("user", "name email");
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    if (req.user.role === "USER" && task.user.toString() !== req.user.id) {
      const error = new Error("Not allowed to delete this task");
      error.statusCode = 403;
      throw error;
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
