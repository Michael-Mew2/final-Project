import {Server} from "socket.io"; 
import socketHandler from "../socketHandlers/socketHandler.js";

const FRONTEND_URL = process.env.FRONTEND_URL

export const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        },
    });

    io.on("connection", (socket) => {
        console.log(`New client is connected: ${socket.id}`);

        socketHandler(io, socket);

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
}