const express = require("express");
const router = express.Router();
const projectController = require("../controller/project");

router.route("/project").post(projectController.createProject);
router.route("/project").get(projectController.getAllProjects);
router.route("/project/:id").put(projectController.updateProject);
router.route("/project/:id").delete(projectController.deleteProject);
router.route("/project/:id").get(projectController.getProjectById);
router.route("/projects/:id").get(projectController.getProjectsByUser);
router.route("/usersByProject/:id").get(projectController.getUsersByProject);
router
  .route("/usersNoProject/:id")
  .post(projectController.getUsersNotInProject);
router.route("/addAdmin/:id").post(projectController.addAdminToProject);
router.route("/refreshProject").post(projectController.refreshProject);
module.exports = router;
