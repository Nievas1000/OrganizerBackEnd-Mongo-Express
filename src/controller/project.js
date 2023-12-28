const mongoose = require("mongoose");
const Project = require("../model/project");
const User = require("../model/user");

exports.createProject = async (req, res) => {
  const { name, description, startDate, endDate, state, userId } = req.body;
  if (name && description && state && startDate && userId) {
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

        const user = await User.findById(userId);
        user.projects.push(newProject._id);
        newProject.admins.push(user.email);

        await newProject.save();
        await user.save();

        res
          .status(200)
          .json({ message: "Project created!", project: newProject });
      } else {
        res
          .status(404)
          .json({ error: "There is already a project with this name." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(404).json({ error: "Missing fields" });
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

exports.getProjectsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("projects");

    if (user) {
      const projects = user.projects;
      res.status(200).json(projects);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Unable to fetch projects" });
  }
};

exports.getUsersByProject = async (req, res) => {
  const { id } = req.params;
  try {
    const usersInProject = await User.find({ projects: id });
    res.status(200).json(usersInProject);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch users in project" });
  }
};

exports.getUsersNotInProject = async (req, res) => {
  const { id } = req.params;
  try {
    const projectId = new mongoose.Types.ObjectId(id);
    const usersNotInProject = await User.find({
      projects: { $nin: [projectId] },
    });
    res.status(200).json(usersNotInProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch users not in project" });
  }
};

exports.addAdminToProject = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.admins.push(email);
    await project.save();

    res
      .status(200)
      .json({ message: "Admin added successfully", admins: project.admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to add admin to project" });
  }
};
