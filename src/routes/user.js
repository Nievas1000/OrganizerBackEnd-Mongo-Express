const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.route("/user").post(userController.createUser);
router.route("/login").post(userController.checkUser);
router.route("/userByEmail").post(userController.getUserByEmail);

module.exports = router;
