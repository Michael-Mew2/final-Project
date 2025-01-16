import canvasHandlers from "./canvasHandlers.js";
import pixelHandlers from "./pixelHandlers.js";

export default function socketHandler(io, socket) {
  // Pixel-Routes:
  pixelHandlers(io, socket);
  // Canvas-Routes:
  canvasHandlers(io, socket);
}
