import express from "express";

const canvasRouter = express.Router();

canvasRouter
    .get("/section")
    .delete("/reset")
    .get("/colors")
    .get("/")

export default canvasRouter