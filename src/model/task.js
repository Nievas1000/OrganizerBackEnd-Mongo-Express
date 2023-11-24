const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  state: {
    type: String,
  },
  owner: {
    type: String,
  },
  projectId: {
    type: String,
  },
  subtasks: [],
  order: {
    type: Number,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
