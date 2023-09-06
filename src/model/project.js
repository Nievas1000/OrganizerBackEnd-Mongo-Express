const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  state: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
