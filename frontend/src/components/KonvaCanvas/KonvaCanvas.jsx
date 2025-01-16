import React, { useRef, useEffect } from "react";
import Konva from "konva";
import { io } from "socket.io-client";

const KonvaCanvas = ({ selectedColor }) => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const colorRef = useRef(selectedColor);

  // Verweis auf die Socket.IO-Instanz
  const socketRef = useRef(null);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    // Verbindung zum Socket.IO-Server herstellen
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL);

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

    const GRID_SIZE = 50;
    const PIXEL_SIZE = 10;

    // Array zum Speichern der Rechtecke (für einfache Updates)
    const pixelRects = [];

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

        // Klicken auf ein Pixel
        rect.on("click", () => {
          const newColor = colorRef.current;
          rect.fill(newColor);
          layer.batchDraw();

          // Sende das geänderte Pixel an den Server
          socketRef.current.emit("put_pixel", {
            x,
            y,
            color: newColor,
          });
        });

        layer.add(rect);
        pixelRects.push({ x, y, rect });
      }
    }

    layer.batchDraw();

    // Empfange Updates vom Server
    socketRef.current.on("update_pixel", ({ x, y, color }) => {
      const pixel = pixelRects.find((p) => p.x === x && p.y === y);
      if (pixel) {
        pixel.rect.fill(color);
        layer.batchDraw();
      }
    });

    const handleZoom = (e) => {
      e.evt.preventDefault();
      const scaleBy = 1.1;
      const oldScale = stage.scaleX();

      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };

      const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
        y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
      };

      stage.position(newPos);
      stage.batchDraw();
    };

    stage.on("wheel", handleZoom);

    const handleResize = () => {
      stage.size({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      stage.destroy();

      // Socket-Verbindung schließen
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      id="konva-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
      }}
    ></div>
  );
};

export default KonvaCanvas;
