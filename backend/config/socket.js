import { Server } from "socket.io";
import socketHandler from "../socketHandlers/_socketHandler.js";

const FRONTEND_URL = process.env.FRONTEND_URL;

export const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'development' ? "http://localhost:5173/": FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
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
