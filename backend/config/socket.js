import {Server} from "socket.io";
import Pixel from "../models/Pixel.js";

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
        console.log("A user is connected");

        socket
        
    })
}