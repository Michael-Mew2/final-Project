import Pixel from "../../models/Pixel.js";
import getTimeRanges from "../../utils/timeRanges.js";

export const handleGetPixelStats = async (io, socket, data) => {
  try {
    const { range = "all", limit = 20, page = 1 } = data;

    const { today, thisWeek, thisMonth, thisYear } = getTimeRanges();

    let startDate;
    switch (range) {
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

    const parseLimit = parseInt(limit, 10) || 20;
    const parsePage = parseInt(page, 10) || 1;

    const totalPixels = await Pixel.countDocuments(matchStage);

    const mostUsedColors = await Pixel.aggregate([
      { $match: matchStage },
      { $group: { _id: "$color", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $skip: (parsePage - 1) * parseLimit },
      { $limit: parseLimit },
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
        { $skip: (parsePage - 1) * parseLimit },
        { $limit: parseLimit },
      ]);

    socket.emit("pixelStats", {totalPixels, mostUsedColors, mostEditedPixels})
    console.log("Angefragte Statistiken:", "total number of pixels placed:", totalPixels, "most used colors:", mostUsedColors, "most edited pixels:", mostEditedPixels);
    
  } catch (error) {
    console.error("Error fetching pixel stats via socket", error);
    socket.emit("error", {msg:"Error fetching pixel stats via socket!"})
  }
};
