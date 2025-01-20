import Pixel from "../../models/Pixel.js";
import User from "../../models/User.js";

export const handlePlacePixel = async (io, socket, data) => {
  const { x, y, color } = data;
  const userId = socket.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");

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

    user.totalPixelsPlaced += 1;
    user.lastPlacedPixel = { x, y, color, placedAt: new Date() };
    user.placedPixel.push({ x, y, color, placedAt: new Date() });

    if (user.placedPixel.length >= 100) {
        user.placedPixel.shift();
      }

    io.emit("pixelUpdated", {x, y, color});

    console.log("Pixel successfully placed by:", user.username);
  } catch (error) {
    console.error("error in handlePlacePixel:", error.message);
    throw new Error("Failed to place pixel!")
  }
};
