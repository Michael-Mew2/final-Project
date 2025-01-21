import User from "../../models/User.js";
import getTimeRanges from "../../utils/timeRanges.js";

export default async function handleGetUserStats(socket, data) {
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

    const matchStage = startDate
      ? { "placedPixel.placedAt": {startDate}}
      : {};

    const parseLimit = Math.max(parseInt(limit) || 20, 1);
    const parsePage = Math.max(parseInt(page) || 1, 1);

    const topUsers = await User.aggregate([
      { $match: matchStage },
      { $addFields: { pixelCount: { $size: "$placedPixel" } } },
      { $sort: { pixelCount: -1 } },
      { $skip: parsePage - 1 + parseLimit },
      { $limit: parseLimit },
      { $project: { username: 1, totalPixelsPlaced: 1, pixelCount: 1 } },
    ]);
    // console.log("Top users", topUsers);
    
    socket.emit("userStats", { topUsers });
  } catch (error) {
    console.error("Error fetching user stats via socket", error);
    socket.emit("error", {
      msg: "Error fetching pixel stats via socket",
      error,
    });
  }
}
