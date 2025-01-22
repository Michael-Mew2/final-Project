import React from "react";
import "./FarbPalette.css";
import { useCanvasStore } from "../../stores/useCanvasStore";

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFD700", "#800080", "#FF1493", "#00CED1", "#A52A2A"];

const FarbPalette = () => {
  const { selectedColor, setSelectedColor } = useCanvasStore();

  return (
    <div className="color-palette-container">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-circle ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        ></div>
      ))}
    </div>
  );
};

export default FarbPalette;
