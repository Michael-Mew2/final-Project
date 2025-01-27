import { authenticateSocket } from "../middleware/jwt.js";
import { validatePixelDataSocket } from "../middleware/validatePixelData.js";
import { limitPixelChangesSocket } from "../middleware/limitPixelChanges.js";
import { handlePlacePixel } from "./pixelHandlerFragments/placePixelHandler.js";
import { handleGetPixelStats } from "./pixelHandlerFragments/getPixelStatsHandler.js";

export default function pixelHandlers(io, socket) {
    // listen for placePixel:
  socket.on("placePixel", async (data) => {
    try {
      authenticateSocket(socket, next);

      validatePixelDataSocket(data);

      await new Promise((resolve, reject) =>
        limitPixelChangesSocket(socket, (err) => (err ? reject(err) : resolve()))
      );

      await handlePlacePixel(io, socket, data);

      socket.emit("pixelPlaced", {msg: "Pixel successfully placed!"});
    } catch (error) {
        console.error("Error placing pixel:", error.message);
        socket.emit("placePixelError", {msg: error.message})
    }
  });

  // listen for getPixelStats:
  socket.on("getPixelStats", async (data) => {
    try {
        await handleGetPixelStats(io, socket, data)
    } catch (error) {
        console.error("Error fetching pixel stats:", error.message);
        socket.emit("error", {msg: error.message})
    }
  })
  
};