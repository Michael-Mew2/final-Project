import React, { useState } from "react";
import "./FarbPalette.css";

const colors = [
  "#FF5733", // Rot
  "#33FF57", // Grün
  "#3357FF", // Blau
  "#FFD700", // Gold
  "#800080", // Lila
  "#FF1493", // Pink
  "#00CED1", // Türkis
  "#A52A2A", // Braun
];

const FarbPalette = ({ onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    if (onColorSelect) {
      onColorSelect(color); // Farbe an eine übergeordnete Komponente zurückgeben
    }
  };

  return (
    <div className="color-palette">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-circle ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        ></div>
      ))}
    </div>
  );
};

export default FarbPalette;
