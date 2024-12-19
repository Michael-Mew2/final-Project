import Pixel from "../models/Pixel.js";
import User from "../models/User.js";

// ==========

// Zeitspannen:
const getTimeRanges = () => {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const startOfYear = new Date(now.getFullYear(), 0, 1);

  return {
    today: startOfToday,
    thisWeek: startOfWeek,
    thisMonth: startOfMonth,
    thisYear: startOfYear,
  };
};

// ----------
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

    const pixel = await Pixel.findOne({ x, y });
    if (!pixel)
      return res
        .status(404)
        .json({ msg: "No pixel found at these coordinates!" });

    if (!pixel.history || !pixel.history.length === 0)
      return res.status(404).json({ msg: "No history found for this pixel!" });

    const sortedHistory = pixel.history.sort(
      (a, b) => new Date(b.placedAt) - new Date(a.placedAt)
    );

    res.status(200).json({ history: sortedHistory });
  } catch (error) {
    console.log("error fetching pixel-history:", error);
    res.status(500).json({ msg: "Error fetching the pixel-history!" });
  }
};

// ----------

// Pixelstatistiken:
export const getPixelStats = async (req, res) => {
  try {
    const { today, thisWeek, thisMonth, thisYear } = getTimeRanges();

    const ranges = req.query.range || "all";

    // console.log(ranges);

    let startDate;
    switch (ranges) {
      case "today":
        startDate = today;
        break;
      case "thisWeek":
        startDate = thisWeek;
        break;
      case "thisMonth":
        startDate = thisMonth;
        break;
      case "thisYear":
        startDate = thisYear;
        break;
      default:
        startDate = null;
        break;
    }

    const matchStage = startDate ? { updatedAt: { $gte: startDate } } : {};

    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;

    const totalPixels = await Pixel.countDocuments(matchStage);

    const mostUsedColors = await Pixel.aggregate([
      { $match: matchStage },
      { $group: { _id: "$color", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    const mostEditedPixels = await Pixel.aggregate([
      { $match: matchStage },
      {
        $addFields: {
          editCount: {
            $cond: {
              if: { $isArray: "$history" },
              then: { $size: "$history" },
              else: 0,
            },
          },
        },
      },
      { $sort: { editCount: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    res.status(200).json({ totalPixels, mostUsedColors, mostEditedPixels });
  } catch (error) {
    console.log("error fetching pixel stats:", error);
    res.status(500).json({ msg: "Error fetching pixel stats!" });
  }
};

// ----------

// Benutzer-Ranglisten nach gesetzten Pixeln (wird im userRouter aufgerufen!):
export const getTopUsersByPixels = async (req, res) => {
  try {
    const { today, thisWeek, thisMonth, thisYear } = getTimeRanges();

    const ranges = req.query.range || "all";

    // console.log(ranges);

    let startDate;
    switch (ranges) {
      case "today":
        startDate = today;
        break;
      case "thisWeek":
        startDate = thisWeek;
        break;
      case "thisMonth":
        startDate = thisMonth;
        break;
      case "thisYear":
        startDate = thisYear;
        break;
      default:
        startDate = null;
        break;
    }

    const matchStage = startDate
      ? { $expr: { $gte: [{ $max: "$placedPixel.placedAt" }, startDate] } }
      : {};

    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;

    const topUsers = await User.aggregate([
      { $match: matchStage },
      { $addFields: { pixelCount: { $size: "$placedPixel" } } },
      { $sort: { pixelCount: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      { $project: { username: 1, totalPixelsPlaced: 1, pixelCount: 1 } },
    ]);

    res.status(200).json({ topUsers });
  } catch (error) {
    console.log("Error fetching top users by range:", error);
    res.status(500).json({ msg: "Error fetching top users by range!" });
  }
};
