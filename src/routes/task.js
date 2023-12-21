const express = require("express");
const router = express.Router();
const taskController = require("../controller/task");

router.route("/task").post(taskController.createTask);
router.route("/task/:id").get(taskController.getTasksByProject);
router.route("/task/:id").delete(taskController.deleteTask);
router.route("/task/:id").put(taskController.updateTask);
router.route("/taskInfo/:id").get(taskController.getTaskById);
router.route("/task/:id").put(taskController.updateTask);
router.route("/updateTasksOrder").put(taskController.updateTasksOrders);
router
  .route("/taskByStatus/:projectId/:status")
  .get(taskController.getTaskByStatus);
router.route("/updateOwner/:id").put(taskController.updateOwner);
router.route("/updateStatus/:id").put(taskController.updateStatus);

module.exports = router;
