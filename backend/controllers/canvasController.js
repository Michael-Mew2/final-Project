import Pixel from "../models/Pixel.js";

// ==========

// Leinwand-Bereich aufrufen:
export const getCanvasSection = async (req, res) => {
  try {
    const { xStart, yStart, xEnd, yEnd } = req.query;

    const pixels = await Pixel.find({
      x: { $gte: xStart, $lte: xEnd },
      y: { $gte: yStart, $lte: yEnd },
    });

    res.status(200).json({pixels});
  } catch (error) {
    console.log("Error getting a canvas section", error);
    res.status(500).json({msg: "Error fetching a canvas section!", error})
  }
};

// ----------

// gesamte Leinwand anzeigen:
export const getFullCanvas = async (req, res) => {
    try {
        const pixels = await Pixel.find({});

        if(!pixels || pixels.length <= 0) return res.status(404).json({msg: "No Pixels on the canvas yet!"});

        res.status(200).json({pixels})
    } catch (error) {
        console.log("Error getting the full canvas:", error);
        res.status(500).json({msg: "Error fetching the entire canvas!", error})
    }
}

// ----------

// gesamte Leinwand zurücksetzten (nur im äußerstem Notfall nutzen):
export const resetCanvas = async (req, res) => {
    try {
        const {resetPassword} = req.body;
        const superPassword = process.env.RESET_PASSWORD;
        if(resetPassword !== superPassword) return res.status(401).json({msg: "Du solltest dich zuerst bei den anderen erkundigen bevor du die Leinwand zurücksetzt!"})

        await Pixel.deleteMany({});

        res.status(200).json({msg: "The canvas has been reset!"})
    } catch (error) {
        console.log("Error resetting the canvas:", error);
        res.status(500).json({msg: "Error resetting "})
        
    }
} 