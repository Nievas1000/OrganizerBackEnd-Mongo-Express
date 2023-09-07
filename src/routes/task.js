const express = require("express");
const router = express.Router();
const taskController = require("../controller/task");

router.route("/task").post(taskController.createTask);
router.route("/task/:id").get(taskController.getTasksByProject);

module.exports = router;
