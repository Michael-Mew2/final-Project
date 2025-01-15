import { authenticateSocket } from "../middleware/jwt.js";
import { validatePixelDataSocket } from "../middleware/validatePixelData";
import { limitPixelChangesSocket } from "../middleware/limitPixelChanges";
import { handlePlacePixel } from "./placePixelHandler.js";

export default function socketHandler(io, socket) {
  // listen for place-pixel:
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
        socket.emit("error", {msg: error.message})
    }
  });
};
