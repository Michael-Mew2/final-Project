import React, { useState } from "react";
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
    setSelectedColor(color); // Setzt die neue Farbe, wenn sie in der Farbpalette ausgewählt wird
  };


  return (
    <div className="layout-container">
      <Header onLoginClick={handleLoginOpen} />


      {/* Farbpalette */}
      <FarbPalette onColorSelect={handleColorSelect} />

      {/* Canvas */}
      <main>
        <KonvaCanvas selectedColor={selectedColor} />
          {children}
      </main>

      <Footer />

      <LoginOverlay
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Layout;
