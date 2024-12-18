import Pixel from "../models/Pixel.js";
import User from "../models/User.js";

// ==========

// Einen Pixel auf der Leinwand setzten/ändern :
export async function putPixelOnCanvas(req, res) {
  try {
    const userId = req.user.id;
    // console.log(userId);

    const { x, y, color } = req.body;
    if (!userId || x === undefined || y === undefined || !color) {
      return res
        .status(400)
        .json({ msg: "additional information is required!" });
    }

    const user = await User.findById(userId);
    // console.log(user.username);

    if (!user) return res.status(404).json({ msg: "User not found!" });

    const pixel = await Pixel.findOneAndUpdate(
      { x, y },
      {
        $set: { color: color, addedBy: userId, updatedAt: new Date() },
        $push: {
          history: {
            $each: [
              {
                color: color,
                addedBy: userId,
                placedAt: new Date(),
              },
            ],
            $slice: -100, // Behalte nur die letzten 100 Einträge
          },
        },
      },
      { upsert: true, new: true }
    );

    // console.log(pixel);

    user.totalPixelsPlaced += 1;
    user.lastPlacedPixel = { x, y, color, placedAt: new Date() };
    user.placedPixel.push({ x, y, color, placedAt: new Date() });

    if (user.placedPixel.length >= 100) {
      user.placedPixel.shift();
    }

    await user.save();

    // console.log(user);
    return res.status(200).json({
      msg: "Pixel successfully placed!",
      pixel,
      user: {
        totalPixelsPlaced: user.totalPixelsPlaced,
        lastPlacedPixel: user.lastPlacedPixel,
      },
    });
  } catch (error) {
    console.error(error);
    console.log("error in putPixelOnCanvas:", error);
    res.status(500).json({ msg: "Putting a Pixel was unsuccessful!" });
  }
}

// ----------

// Einen einzelnen Pixel aufrufen:
export const getPixel = async (req, res) => {
  try {
    const { x, y } = req.params;

    const pixel = await Pixel.findOne({ x, y });

    if (!pixel) return res.status(404).json({ msg: "Pixel not found" });

    res.status(200).json({ pixel });
  } catch (error) {
    console.log("error finding a pixel:", error);
    res.status(500).json({ msg: "Unable to find a pixel!" });
  }
};

// ----------

// Pixelhistorie:
export const getPixelHistory = async (req, res) => {
  try {
    const { x, y } = req.params;

    const history = await PixelHistory.find({ x, y }).sort({ placedAt: -1 }); // Für Ansatz 1
    // Oder: const history = pixel.history; // Für Ansatz 2 nach Pixel.findOne()

    if (!history.length) {
      return res.status(404).json({ msg: "No history for this pixel." });
    }

    res.status(200).json({ history });
  } catch (error) {
    console.log("error fetching pixel-history:", error);
    res.status(500).json({ msg: "Error fetching the pixel-history!" });
  }
};

// ----------

// Pixelstatistiken:
export const getPixelStats = async (req, res) => {
  try {
  } catch (error) {}
};
