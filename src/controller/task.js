const mongoose = require("mongoose");
const Task = require("../model/task");

exports.createTask = async (req, res) => {
  const { name, description, state, projectId, owner } = req.body;
  if (name && description && state && projectId) {
    try {
      const taskExist = await Task.findOne({ name });
      if (!taskExist) {
        const newTask = new Task({
          name,
          description,
          state,
          projectId,
          owner,
        });
        await newTask.save();
        res.status(200).json({ message: "Task created!" });
      } else {
        res
          .status(404)
          .json({ error: "There is already a task with this name." });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(404).json({ message: "Missing fields" });
  }
};

exports.getTasksByProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch tasks" });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { name, description, state, owner } = req.body;

  if (name && description && state) {
    try {
      const existingTask = await Task.findById(taskId);

      if (existingTask) {
        existingTask.name = name;
        existingTask.description = description;
        existingTask.state = state;
        existingTask.owner = owner;

        await existingTask.save();

        res.status(200).json({ message: "Task updated!" });
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ message: "Missing fields" });
  }
};
