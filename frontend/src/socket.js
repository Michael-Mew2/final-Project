import { io } from "socket.io-client";

// Hole die Socket-URL aus der .env-Datei (oder verwende die Backend-URL als Fallback)
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL;

// Initialisiere die Socket.IO-Verbindung
const socket = io(SOCKET_URL, {
  autoConnect: false, // Verbindung nur bei Bedarf herstellen
});

export default socket;
