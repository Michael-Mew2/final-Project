import express from "express";
import * as pixel from "../controllers/pixelController.js";
import { authenticate } from "../middleware/jwt.js";
import { validatePixelData } from "../middleware/validatePixelData.js";
import { limitPixelChanges } from "../middleware/limitPixelChanges.js";

const pixelRouter = express.Router();

pixelRouter
  .put("/place", authenticate, limitPixelChanges, validatePixelData, pixel.putPixelOnCanvas)
  .get("/:x/:y", pixel.getPixel)
  .get("/:x/:y/history", pixel.getPixelHistory)
  .get("/stats", pixel.getPixelStats);

export default pixelRouter;
