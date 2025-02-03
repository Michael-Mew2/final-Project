import * as React from "react";
import KonvaCanvas from "./KonvaCanvas/KonvaCanvas";

export default function StartScreen() {
  return (
    <>
      <KonvaCanvas isInteractive={false} />
      <div>
        {/* <h1 style={{ zIndex: 20 }}>Home</h1> */}
      </div>
    </>
  );
}
