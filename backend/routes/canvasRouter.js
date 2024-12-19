import express from "express";
import * as canvas from "../controllers/canvasController.js";
import { authenticate } from "../middleware/jwt.js";
import { checkRole } from "../middleware/checkUser.js";

const canvasRouter = express.Router();

canvasRouter
  .get("/section", authenticate, checkRole("admin"), canvas.getCanvasSection)
  .delete("/reset", authenticate, checkRole("admin"), canvas.resetCanvas)
  .get("/colors")
  .get("/", canvas.getFullCanvas);

export default canvasRouter;
