import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import KonvaCanvas from "./KonvaCanvas/KonvaCanvas";
import FarbPalette from "./FarbPalette/FarbPalette";
import LoginOverlay from "./LoginOverlay/LoginOverlay";


const Layout = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

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

  const layoutStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  };

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#f8f8f8",
    zIndex: 10,
  };

  const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50px",
    backgroundColor: "#f8f8f8",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const paletteStyle = {
    position: "fixed",
    bottom: "70px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  };

  return (
    <div style={layoutStyle}>
      {/* Vollbild-Raster */}
      <KonvaCanvas selectedColor={selectedColor} />

      {/* Header */}
      <header style={headerStyle}>
        <Header onLoginClick={handleLoginOpen} />
      </header>

      {/* Farbpalette */}
      <div style={paletteStyle}>
        <FarbPalette onColorSelect={handleColorSelect} />
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        <Footer />
      </footer>

      {/* Login Overlay */}
      <LoginOverlay
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Layout;
