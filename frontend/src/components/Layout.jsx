import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import KonvaCanvas from "./KonvaCanvas/KonvaCanvas";
import FarbPalette from "./FarbPalette/FarbPalette";
import LoginOverlay from "./LoginOverlay/LoginOverlay";
import { useColorStore } from "./FarbPalette/ColorStore";

const Layout = ({ children }) => {
  const { selectedColor } = useColorStore();

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = (userData) => {
    console.log("Eingeloggt als:", userData.username);
    setIsLoginOpen(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.width = "100vw";
    document.documentElement.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style = "";
      document.documentElement.style = "";
    };
  }, []);

  const layoutStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  };

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#f8f8f8",
    zIndex: 10,
  };

  const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50px",
    backgroundColor: "#f8f8f8",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const paletteStyle = {
    position: "fixed",
    bottom: "70px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 0,
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <KonvaCanvas selectedColor={selectedColor} />
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "60px", backgroundColor: "#f8f8f8", zIndex: 10 }}>
        <Header onLoginClick={() => {}} />
      </header>
      <div style={{ position: "fixed", bottom: "70px", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <FarbPalette />
      </div>
      <footer style={{ position: "fixed", bottom: 0, left: 0, width: "100%", height: "50px", backgroundColor: "#f8f8f8", zIndex: 10 }}>
        <Footer />
      </footer>
      <LoginOverlay isOpen={false} onClose={() => {}} onLogin={() => {}} />
    </div>
  );
};

export default Layout;
