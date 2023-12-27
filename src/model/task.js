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
    email: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  projectId: {
    type: String,
  },
  subtasks: [],
  comments: [
    {
      id: {
        type: String,
      },
      email: {
        type: String,
      },
      date: {
        type: Date,
      },
      name: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
