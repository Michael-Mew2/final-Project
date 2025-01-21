import handleGetCanvas from "./canvasHandlerFragments/getCanvasHandler.js";

export default function canvasHandlers(io, socket) {
    // Get full canvas:
  socket.on("getCanvas", async (data) => {
    try {
      await handleGetCanvas(socket);
    } catch (error) {
      console.error("Error fetching canvas:", error.message);
      socket.emit("error", { msg: error.message });
    }
  });
}
