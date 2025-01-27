import * as React from "react";
import KonvaCanvas from "./KonvaCanvas/KonvaCanvas";
import FarbPalette from "./FarbPalette/FarbPalette";
import { useCanvasStore } from "../stores/useCanvasStore";

export default function CanvasPage() {
  const socket = useCanvasStore(state => state.socket);
  return (
    <>
      <KonvaCanvas isInteractive={true} socket={socket} />
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
