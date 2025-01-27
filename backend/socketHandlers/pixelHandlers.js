import { authenticateSocket, verifyToken } from "../middleware/jwt.js";
import { validatePixelDataSocket } from "../middleware/validatePixelData.js";
import { limitPixelChangesSocket } from "../middleware/limitPixelChanges.js";
import { handlePlacePixel } from "./pixelHandlerFragments/placePixelHandler.js";
import { handleGetPixelStats } from "./pixelHandlerFragments/getPixelStatsHandler.js";
import User from "../models/User.js";

export default function pixelHandlers(io, socket) {
  // listen for placePixel:
  socket.on("placePixel", async (data) => {
    console.log("Data recieved:", data);

    try {
      const { token, ...pixelData } = data;
      if (!token) {
        throw new Error("Authentication failed: No token provided!");
      }

      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      if (!user) throw new Error("User not found!");

      // Token erneuern, wenn er bald abläuft
      const tokenExp = decoded.exp * 1000;
      const fiveMinutes = 5 * 60 * 1000;
      if (tokenExp - Date.now() < fiveMinutes) {
        const newToken = generateToken({ userId: user._id });
        socket.emit("tokenRenewal", { token: newToken });
      }

      // Benutzerinformationen an das Socket-Objekt anhängen
      socket.user = { id: user._id, role: user.role };

      // authenticateSocket(socket, next);

      validatePixelDataSocket(pixelData);

      await new Promise((resolve, reject) =>
        limitPixelChangesSocket(socket, (err) =>
          err ? reject(err) : resolve()
        )
      );

      await handlePlacePixel(io, socket, pixelData);

      socket.emit("pixelPlaced", { msg: "Pixel successfully placed!" });
    } catch (error) {
      console.log("Data causing error:", data);

      console.error("Error placing pixel:", error.message);
      socket.emit("placePixelError", { msg: error.message });
    }
  });

  // listen for getPixelStats:
  socket.on("getPixelStats", async (data) => {
    try {
      await handleGetPixelStats(io, socket, data);
    } catch (error) {
      console.error("Error fetching pixel stats:", error.message);
      socket.emit("error", { msg: error.message });
    }
  });
}
