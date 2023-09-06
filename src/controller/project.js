const mongoose = require("mongoose");
const Project = require("../model/project");

exports.createProject = async (req, res) => {
  const { name, description, startDate, endDate, state } = req.body;
  if (name && description && state && startDate) {
    try {
      const projectExist = await Project.findOne({ name });
      if (!projectExist) {
        const newProject = new Project({
          name,
          description,
          startDate,
          endDate,
          state,
        });
        await newProject.save();
        res.status(200).json({ message: "Project created!" });
        mongoose.connection.close();
      } else {
        res
          .status(404)
          .json({ error: "There is already a project with this name." });
        mongoose.connection.close();
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(404).json({ message: "Missing fields" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch projects" });
  }
};
