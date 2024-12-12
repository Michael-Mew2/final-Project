import express from "express";
import * as user from "../controllers/userController.js"
import validateRequest from "../middleware/validateRequest.js";
import validateUser from "../validation/userValidation.js";

const userRouter = express.Router();

userRouter
    .post("/signin", validateRequest(validateUser), user.createUser)
    // .post("/login", login)
    // .get("/all-user", allUser)
    // .post("/verify", verify)

export default userRouter