import React, { useRef, useEffect } from "react";
import Konva from "konva";

const KonvaCanvas = ({ selectedColor }) => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const GRID_SIZE = 50;
  const PIXEL_SIZE = 10;

  useEffect(() => {
    // Stage und Layer werden nur einmal beim Initialisieren erstellt
    const stage = new Konva.Stage({
      container: "konva-container",
      width: window.innerWidth * 0.5,  // Setzt die Breite auf 50% der Viewport-Breite
      height: window.innerHeight * 0.5, // Setzt die Höhe auf 50% der Viewport-Höhe
      draggable: true,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    stageRef.current = stage;
    layerRef.current = layer;

    const initialRects = [];
    // Initiales Gitter erstellen
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const rect = new Konva.Rect({
          x: x * PIXEL_SIZE,
          y: y * PIXEL_SIZE,
          width: PIXEL_SIZE,
          height: PIXEL_SIZE,
          fill: "#FFFFFF", // Standardfarbe (weiß)
          stroke: "#CCCCCC",
          strokeWidth: 1,
        });

        // Beim Klicken auf ein Rechteck ändern wir die Farbe des Pixels
        rect.on("click", () => {
          rect.fill(selectedColor); // Ändert die Farbe des angeklickten Pixels
          layer.batchDraw(); // Zeichnet nur das geänderte Pixel neu
        });

        initialRects.push(rect);
        layer.add(rect); // Fügt das Rechteck der Schicht hinzu
      }
    }

    layer.batchDraw(); // Zeichnet das Gitter nach dem Erstellen

    // Zoom-Funktionalität hinzufügen
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
      stage.destroy(); // Zerstört die Stage bei Komponenten-Unmount
    };
  }, []); // Dieser Effekt läuft nur einmal beim ersten Rendern

  useEffect(() => {
    // Dieser Effekt wird aufgerufen, wenn sich die Farbe ändert
    const layer = layerRef.current;
    if (layer) {
      layer.batchDraw(); // Das Layer neu zeichnen
    }
  }, [selectedColor]); // Dieser Effekt wird ausgelöst, wenn sich die Farbe ändert

  return (
    <div
      id="konva-container"
      style={{
        width: "45vw", // Setzt die Breite des Containers auf 50% der Viewport-Breite
        height: "50vh", // Setzt die Höhe des Containers auf 50% der Viewport-Höhe
        border: "1px solid black",
      }}
    ></div>
  );
};

export default KonvaCanvas;
