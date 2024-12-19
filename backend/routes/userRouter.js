import express from "express";
import * as user from "../controllers/userController.js";
import validateRequest from "../middleware/validateRequest.js";
import validateUser from "../validation/userValidation.js";
import { authenticate } from "../middleware/jwt.js";
import { checkRole, checkUser } from "../middleware/checkUser.js";
import { getTopUsersByPixels } from "../controllers/pixelController.js";

const userRouter = express.Router();

userRouter
  .post("/signin", validateRequest(validateUser), user.createUser)
  .post("/login", user.loginUser)
  .post("/logout", user.logoutUser)
  .get("/all", authenticate, user.getAllUser)
  .get("/top-by-range", getTopUsersByPixels)
  .get("/:userId/display", authenticate, checkUser, user.getUserData)
  .patch(
    "/:userId/update",
    authenticate,
    checkUser,
    checkRole("admin", "user"),
    user.updateUserData
  )
  .get("/admin/users", authenticate, checkRole("admin"), user.getAllUserAsAdmin)
  .put(
    "/admin/users/:userId/block",
    authenticate,
    checkRole("admin"),
    user.blockUser
  )
  .put(
    "/admin/users/:userId/unblock",
    authenticate,
    checkRole("admin"),
    user.unblockUser
  )
  .delete(
    "/admin/users/:userId/delete",
    authenticate,
    checkRole("admin"),
    user.deleteUserAsAdmin
  );
// .post("/verify", verify)

export default userRouter;
