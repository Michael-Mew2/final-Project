import React, { useRef, useEffect } from "react";
import Konva from "konva";

const KonvaCanvas = ({ selectedColor }) => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const colorRef = useRef(selectedColor);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    const stage = new Konva.Stage({
      container: "konva-container",
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.5,
      draggable: true,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    stageRef.current = stage;
    layerRef.current = layer;

    const GRID_SIZE = 50;
    const PIXEL_SIZE = 10;

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
          rect.fill(colorRef.current);
          layer.batchDraw();
        });

        layer.add(rect);
      }
    }

    layer.batchDraw();

    return () => {
      stage.destroy();
    };
  }, []);

  return (
    <div
      id="konva-container"
      style={{
        width: "45vw",
        height: "50vh",
        border: "1px solid black",
      }}
    ></div>
  );
};

export default KonvaCanvas;
