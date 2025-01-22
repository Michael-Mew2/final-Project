import * as React from "react";
import KonvaCanvas from "./KonvaCanvas/KonvaCanvas";
import FarbPalette from "./FarbPalette/FarbPalette";

export default function CanvasPage() {
  return (
    <>
      <KonvaCanvas selectedColor={selectedColor} socket={socket} />
      <div
        style={{
          position: "fixed",
          bottom: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      >
        <FarbPalette />
      </div>
    </>
  );
}
