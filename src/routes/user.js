const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.route("/user").post(userController.createUser);
router.route("/login").post(userController.checkUser);
router.route("/userByEmail").post(userController.getUserByEmail);
router.route("/addPassword").put(userController.addPasswordToUser);
router.route("/checkLogin").post(userController.checkLogin);
router.route("/allUsers").get(userController.getAllUsers);
router.route("/addProject").post(userController.addProjectsToUser);
router.route("/removeProject").post(userController.removeProjectFromUser);

module.exports = router;
