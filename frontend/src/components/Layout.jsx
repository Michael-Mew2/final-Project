import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import KonvaCanvas from "./KonvaCanvas/KonvaCanvas";
import FarbPalette from "./FarbPalette/FarbPalette";
import LoginOverlay from "./LoginOverlay/LoginOverlay";
import { useColorStore } from "./FarbPalette/ColorStore";
import "./Layout.css";
import { io } from "socket.io-client";


const Layout = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [socket, setSocket] = useState(null);


  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = (userData) => {
    console.log("Eingeloggt als:", userData.username);
    setIsLoginOpen(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_BASE_URL);
    setSocket(newSocket);

    console.log("Socket.IO verbunden");

    return () => {
      newSocket.disconnect();
      console.log("Socket.IO getrennt");
    };
  }, []);

  useEffect(() => {
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

    return () => {
      document.body.style = "";
      document.documentElement.style = "";
    };
  }, []);

  return (
    
      {/* Vollbild-Raster */}
     <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <KonvaCanvas selectedColor={selectedColor} socket={socket} />

      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "60px", backgroundColor: "#f8f8f8", zIndex: 10 }}>
        <Header onLoginClick={handleLoginOpen} />

      </header>
      <div style={{ position: "fixed", bottom: "70px", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <FarbPalette />
      </div>
      <footer style={{ position: "fixed", bottom: 0, left: 0, width: "100%", height: "45px", backgroundColor: "#f8f8f8", zIndex: 10 }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
