import pixelHandlers from "./pixelHandlers.js";

export default function socketHandler(io, socket) {
  // Pixel- and Canvas-Routes:
  pixelHandlers(io, socket)
  
};
