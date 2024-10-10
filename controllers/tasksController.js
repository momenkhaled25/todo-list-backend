const Task = require("../models/tasksModel");

// createTask
const createTask = async (req, res) => {
  const { title, details } = req.body;
  const { userId } = req.user;

  if (!title || !details) {
    return res
      .status(400)
      .json({ error: true, message: "Title and description are required" });
  }

  const newTask = new Task({
    title,
    details,
    user: userId,
  });

  await newTask.save();
  return res.status(201).json({ error: false, task: newTask });
};

// get all tasks
const getAllTasks = async (req, res) => {
  const { userId } = req.user;

  try {
    const tasks = await Task.find({ user: userId });
    return res.status(200).json({ error: false, tasks });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Error fetching tasks" });
  }
};

const updateCompletionStatus = async (req, res) => {
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { completed: req.body.completed } }, // Use the value sent in the body
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    return res.status(200).json({ error: false, task: updatedTask });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Error updating task completion status" });
  }
};

const updateTaskData = async (req, res) => {
  const { taskId } = req.params;
  const { title, details } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, details },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    return res.status(200).json({ error: false, task: updatedTask });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Error updating task data" });
  }
};

// getTaskById
const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    return res.status(200).json({ error: false, task });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Error fetching task" });
  }
};

//delete task by id
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  console.log(req.params);
  if (!taskId) {
    return res
      .status(400)
      .json({ error: true, message: "Task ID is required" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ error: false, message: "Task deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Error deleting task" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateCompletionStatus,
  updateTaskData,
  getTaskById,
  deleteTask,
};
