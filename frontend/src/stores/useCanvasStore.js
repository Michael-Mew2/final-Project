import { create } from "zustand";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const useCanvasStore = create((set, get) => ({
  socket: null,
  selectedColor: "#000000",

  setSelectedColor: (color) => set({ selectedColor: color }),

  initializeSocket: () => {
    const newSocket = io(import.meta.env.VITE_API_BASE_URL);
    set({ socket: newSocket });
    console.log("Socket.IO verbunden");

    // Cleanup-Funktion zurückgeben
    return () => {
      newSocket.disconnect();
      console.log("Socket.IO getrennt");
    };
  },

  initializeStyles: () => {
    // Styles setzen
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.width = "100vw";
    document.documentElement.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";

    // Cleanup-Funktion zurückgeben
    return () => {
      document.body.style = "";
      document.documentElement.style = "";
    };
  },
}));

// Optional: Effect-Manager-Komponente
export const CanvasEffectsManager = ({ children }) => {
  const { initializeSocket, initializeStyles } = useCanvasStore();

  useEffect(() => {
    const cleanupSocket = initializeSocket();
    const cleanupStyles = initializeStyles();

    return () => {
      cleanupSocket();
      cleanupStyles();
    };
  }, []);

  return children;
};
