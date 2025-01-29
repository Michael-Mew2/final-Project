import React, { useRef, useEffect } from "react";
import Konva from "konva";
import { useCanvasStore } from "../../stores/useCanvasStore";
import "./KonvaCanvas.css";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const KonvaCanvas = ({ isInteractive }) => {
  const { selectedColor } = useCanvasStore();
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const colorRef = useRef(selectedColor);

  const socketRef = useRef(null);
  
  const checkENV = import.meta.env.VITE_API_NODE_ENV === "production";
  const URL = checkENV ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_DEV_URL

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    socketRef.current = io(URL);

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

        if (isInteractive) {
          rect.on("click", () => {
            // ----- -----
            // cookie-Token (bitte sicherer machen, da httpOnly im BE beim setzten entfernt wurde):
            const token = Cookies.get("jwt");
            console.log("Expected token:", token);

            if (!token) {
              console.log("No token, please log in!");
              return;
            }
            // ----- -----

            const newColor = colorRef.current;
            rect.fill(newColor);
            layer.batchDraw();

            socketRef.current.emit("placePixel", {
              x,
              y,
              color: newColor,
              token,
            });
          });

          socketRef.current.on("pixelPlaced", ({ msg }) => {
            console.log("msg:", msg);
          });

          socketRef.current.on("placePixelError", ({ msg }) => {
            console.error("Placing Pixel Error:", msg);
          });
        }

        // rect.on("click", () => {
        //   const newColor = colorRef.current;
        //   rect.fill(newColor);
        //   layer.batchDraw();

        //   socketRef.current.emit("placePixel", {
        //     x,
        //     y,
        //     color: newColor,
        //   });
        // });

        layer.add(rect);
        pixelRects.push({ x, y, rect });
      }
    }

    layer.batchDraw();

    const pixelMap = new Map();
    pixelRects.forEach(({ x, y, rect }) => {
      pixelMap.set(`${x}, ${y}`, rect);
    });

    const updateCanvas = (canvasData) => {
      canvasData.forEach(({ x, y, color }) => {
        const key = `${x}, ${y}`;
        const rect = pixelMap.get(key);
        if (rect) {
          rect.fill(color);
        }
      });
      layer.batchDraw();
    };

    socketRef.current.emit("getCanvas", {}, (canvasData) => {
      // console.log("Connected to canvas...");

      updateCanvas(canvasData);
    });

    socketRef.current.on("pixelsOnCanvas", ({ pixels }) => {
      updateCanvas(
        pixels.map((pixel) => ({
          x: pixel.x,
          y: pixel.y,
          color: pixel.color,
        }))
      );
    });

    socketRef.current.on("canvasError", ({ msg }) => {
      console.error("Canvas Error:", msg);
    });

    socketRef.current.on("emptyCanvas", () => {
      console.log("Canvas is empty");
    });

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

      const newScale =
        e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x:
          -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
          newScale,
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
        pointerEvents: isInteractive ? "auto" : "none",
      }}
    ></div>
  );
};

export default KonvaCanvas;
