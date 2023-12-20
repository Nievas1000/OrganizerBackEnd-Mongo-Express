const express = require("express");
const router = express.Router();
const projectController = require("../controller/project");

router.route("/project").post(projectController.createProject);
router.route("/project").get(projectController.getAllProjects);
router.route("/projects/:id").get(projectController.getProjectsByUser);
router.route("/usersByProject/:id").get(projectController.getUsersByProject);
router.route("/usersNoProject/:id").get(projectController.getUsersNotInProject);

module.exports = router;
