const express = require("express");
const router = express.Router();

const createUserController = require("./signup");
const loginController = require("./login");

router.post("/signup", createUserController.userSignUp);

router.post("/login", loginController.userLogin);

module.exports = router;
