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
