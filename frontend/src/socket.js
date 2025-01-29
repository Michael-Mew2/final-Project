import { io } from "socket.io-client";

const checkENV = import.meta.env.VITE_API_NODE_ENV === "production"

const SOCKET_URL = checkENV ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_DEV_URL

const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connection_error", (err) => {
  console.warn("Socket.IO-Error:", err);
})

export default socket;
