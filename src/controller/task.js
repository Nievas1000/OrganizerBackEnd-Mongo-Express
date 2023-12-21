const mongoose = require("mongoose");
const Task = require("../model/task");
const User = require("../model/user");

exports.createTask = async (req, res) => {
  const { name, description, state, projectId, owner } = req.body;
  if (name && description && state && projectId && owner) {
    try {
      const taskExist = await Task.findOne({ name });
      const user = await User.findById(owner);
      if (!taskExist) {
        const newTask = new Task({
          name,
          description,
          state,
          projectId,
          owner: {
            name: user.name,
            email: user.email,
          },
        });
        await newTask.save();
        const allTasks = await Task.find();
        res.status(200).json({ message: "Task created!", tasks: allTasks });
      } else {
        res
          .status(404)
          .json({ error: "There is already a task with this name." });
      }
    } catch (error) {
      console.log(error);
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

exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch task" });
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
    console.error(error);
    res.status(500).json({ error });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete task" });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { name, description } = req.body;

  try {
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (name && description) {
      existingTask.name = name;
      existingTask.description = description;
    }

    await existingTask.save();

    res
      .status(200)
      .json({ message: "Task updated successfully", task: existingTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update task" });
  }
};

exports.updateOwner = async (req, res) => {
  const taskId = req.params.id;
  const { email } = req.body;

  try {
    const task = await Task.findById(taskId);
    const user = await User.findOne({ email });

    if (!task || !user) {
      return res.status(404).json({ error: "Task or User not found" });
    }

    task.owner = {
      name: user.name,
      email: user.email,
    };
    await task.save();

    res
      .status(200)
      .json({ message: "Task updated successfully", owner: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update task" });
  }
};

exports.updateStatus = async (req, res) => {
  const taskId = req.params.id;
  const { state } = req.body;
  try {
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (state) {
      existingTask.state = state;
    }

    await existingTask.save();

    res
      .status(200)
      .json({ message: "Task updated successfully", task: existingTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update task" });
  }
};
