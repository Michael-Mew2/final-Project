import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import KonvaCanvas from "./KonvaCanvas/KonvaCanvas";
import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useCanvasStore } from "../stores/useCanvasStore.js";


const Layout = ({children}) => {
  const {selectedColor, setSelectedColor} = useCanvasStore();
  const socket = useCanvasStore(state => state.socket);
  const location = useLocation();

  // const isInteractive = location.pathname === "/canvas"

  // const showCanvas = isInteractive || location.pathname === "/";

  return (
     <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* {showCanvas &&
      <KonvaCanvas isInteractive={isInteractive} />
      } */}

      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "60px", backgroundColor: "#f8f8f8", zIndex: 1 }}>
        <Header />

      </header>
      <main>
        <Outlet />
      </main>
      
      <footer style={{ position: "fixed", bottom: 0, left: 0, width: "100%", height: "45px", backgroundColor: "#f8f8f8", zIndex: 0 }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
