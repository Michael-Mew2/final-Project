import express from "express";
import * as pixel from "../controllers/pixelController.js";
import { authenticate } from "../middleware/jwt.js";

const pixelRouter = express.Router();

pixelRouter
    .put("/place", authenticate, pixel.putPixelOnCanvas)
    .get("/:x/:y", pixel.getPixel)
    .get("/:x/:y/history", pixel.getPixelHistory)
    .get("/stats", pixel.getPixelStats)

export default pixelRouter;
