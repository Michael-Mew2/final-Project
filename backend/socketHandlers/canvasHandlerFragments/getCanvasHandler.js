import Pixel from "../../models/Pixel.js";

const handleGetCanvas = async (socket) => {
  try {
    const pixels = await Pixel.find({});

    if (!pixels || pixels.length <= 0) {
      return socket.emit("emptyCanvas", { msg: "No pixels on canvas" });
    }

    socket.emit("pixelsOnCanvas", { pixels });
  } catch (error) {
    console.error("Error getting the entire canvas:", error);
    socket.emit("canvasError", { msg: "Error fetching pixel on canvas" });
  }
};

export default handleGetCanvas;
