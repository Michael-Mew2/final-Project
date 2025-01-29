import { Server } from "socket.io";
import socketHandler from "../socketHandlers/_socketHandler.js";

const FRONTEND_URL = process.env.FRONTEND_URL;
const FRONTEND_DEV_URL = process.env.FRONTEND_DEV_URL;

export const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL || FRONTEND_DEV_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
    transports: ["websocket"],
  });
  console.log("Socket is running!");
  

  io.on("connection", (socket) => {
    console.log(`New client is connected: ${socket.id}`);

    socketHandler(io, socket);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
