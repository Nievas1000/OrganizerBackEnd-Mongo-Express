const express = require("express");
const router = express.Router();
const projectController = require("../controller/project");

router.route("/project").post(projectController.createProject);
router.route("/project").get(projectController.getAllProjects);

module.exports = router;
