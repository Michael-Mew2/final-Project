import Pixel from "../../models/Pixel.js";

const handleGetCanvas = async (socket) => {
  try {
    // console.log("Fetching canvas ...");
    
    const pixels = await Pixel.find({});
    // console.log("Fetched pixels:", pixels);
    

    if (!pixels || pixels.length <= 0) {
      // console.log("no pixels on canvas!");
      
      socket.emit("emptyCanvas", { msg: "No pixels on canvas" });
      return
    }

    socket.emit("pixelsOnCanvas", { pixels });
  } catch (error) {
    console.error("Error getting the entire canvas:", error);
    socket.emit("canvasError", { msg: "Error fetching pixel on canvas" });
  }
};

export default handleGetCanvas;
