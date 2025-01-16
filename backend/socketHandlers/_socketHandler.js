import canvasHandlers from "./canvasHandlers.js";
import pixelHandlers from "./pixelHandlers.js";
import userHandlers from "./userHandlers.js";

export default function socketHandler(io, socket) {
  // Pixel-Routes:
  pixelHandlers(io, socket);
  // Canvas-Routes:
  canvasHandlers(io, socket);
  // User-Routes:
  userHandlers(io, socket);
}
