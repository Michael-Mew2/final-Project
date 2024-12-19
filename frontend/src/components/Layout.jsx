import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import KonvaCanvas from "./KonvaCanvas";
import FarbPalette from "./FarbPalette";

const Layout = () => {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleColorSelect = (color) => {
    setSelectedColor(color); // Setzt die neue Farbe, wenn sie in der Farbpalette ausgewählt wird
  };

  return (
    <div className="layout-container">
      {/* Header */}
      <Header />

      {/* Farbpalette */}
      <FarbPalette onColorSelect={handleColorSelect} />

      {/* Canvas */}
      <main>
        <KonvaCanvas selectedColor={selectedColor} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
