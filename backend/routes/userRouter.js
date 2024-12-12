const express = require("express");
const router = express.Router();

const { login, signin, allUser, verify } = require("../controllers/userController.js");

router.post("/login", login);
router.post("/signin", signin);
router.get("/all-user", allUser);
router.post("/verify", verify);

module.exports = userRouter;