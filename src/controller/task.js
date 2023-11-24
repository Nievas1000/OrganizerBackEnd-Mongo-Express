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

exports.updateTasksOrders = async (req, res) => {
  const { reorderedTasks } = req.body;

  try {
    const bulkOps = reorderedTasks.map((task, index) => ({
      updateOne: {
        filter: { _id: task._id },
        update: { $set: { order: index + 1 } },
      },
    }));

    await Task.bulkWrite(bulkOps);

    res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getTaskByStatus = async (req, res) => {
  const { status, projectId } = req.params;

  try {
    const tasks = await Task.find({ state: status, projectId });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};
