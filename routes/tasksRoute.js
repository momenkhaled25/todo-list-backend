const express = require("express");

const {
  createTask,
  getAllTasks,
  updateCompletionStatus,
  updateTaskData,
  getTaskById,
  deleteTask,
} = require("../controllers/tasksController");

//Middleware to authenticate token
const authenticateToken = require("../uitilites");

const tasksRouter = express.Router();

tasksRouter.post("/createtask", authenticateToken, createTask);
tasksRouter.get("/get-all-tasks", authenticateToken, getAllTasks);
tasksRouter.get("/get-task/:taskId", authenticateToken, getTaskById);
tasksRouter.patch(
  "/update-completion/:taskId",
  authenticateToken,
  updateCompletionStatus
);
tasksRouter.patch("/update-task/:taskId", authenticateToken, updateTaskData);
tasksRouter.delete("/delete-task/:taskId", authenticateToken, deleteTask);

module.exports = tasksRouter;
