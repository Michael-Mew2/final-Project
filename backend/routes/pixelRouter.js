import express from "express";
import * as pixel from "../controllers/canvasController.js";
import { authenticate } from "../middleware/jwt.js";

const pixelRouter = express.Router();

pixelRouter.put("/pixel/place", authenticate, pixel.putPixelOnCanvas);

export default pixelRouter;
