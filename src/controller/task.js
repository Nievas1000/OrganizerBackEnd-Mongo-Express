const mongoose = require("mongoose");
const Task = require("../model/task");

exports.createTask = async (req, res) => {
  const { name, description, state, projectId } = req.body;
  if (name && description && state && projectId) {
    try {
      const taskExist = await Task.findOne({ name });
      if (!taskExist) {
        const newTask = new Task({ name, description, state, projectId });
        await newTask.save();
        res.status(200).json({ message: "Task created!" });
        mongoose.connection.close();
      } else {
        res
          .status(404)
          .json({ error: "There is already a task with this name." });
        mongoose.connection.close();
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(404).json({ message: "Missing fields" });
  }
};
