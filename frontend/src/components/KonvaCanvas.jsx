import React, { useRef, useEffect } from "react";
import Konva from "konva";

const KonvaCanvas = () => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const GRID_SIZE = 50;
  const PIXEL_SIZE = 10;
  const colors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
  let selectedColor = colors[0];

  useEffect(() => {
    const stage = new Konva.Stage({
      container: "konva-container",
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    stageRef.current = stage;
    layerRef.current = layer;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const rect = new Konva.Rect({
          x: x * PIXEL_SIZE,
          y: y * PIXEL_SIZE,
          width: PIXEL_SIZE,
          height: PIXEL_SIZE,
          fill: "#FFFFFF",
          stroke: "#CCCCCC",
          strokeWidth: 1,
        });

        rect.on("click", () => {
          rect.fill(selectedColor);
          layer.batchDraw();
        });

        layer.add(rect);
      }
    }

    layer.batchDraw();

    stage.on("wheel", (e) => {
      e.evt.preventDefault();
      const scaleBy = 1.05;
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };

      const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
        y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    });

    return () => {
      stage.destroy();
    };
  }, []);

  const handleColorSelect = (color) => {
    selectedColor = color;
  };

  return (
    <div>
      <div id="konva-container" style={{ border: "1px solid black", width: "100%", height: "100%" }}></div>
      <div style={{ marginTop: "10px" }}>
        {colors.map((color, index) => (
          <button
            key={index}
            style={{
              backgroundColor: color,
              width: "30px",
              height: "30px",
              margin: "5px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelect(color)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default KonvaCanvas;
