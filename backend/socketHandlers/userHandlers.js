import handleGetUserStats from "./userHandlerFragments/getUserStatsHandler.js";

export default function userHandlers(io, socket) {
  socket.on("getUserStats", async (data) => {
    try {
      await handleGetUserStats(socket, data);
    } catch (error) {
      console.error("Error fetching user stats:", error.message);
      socket.emit("error", { msg: error.message });
    }
  });
}
