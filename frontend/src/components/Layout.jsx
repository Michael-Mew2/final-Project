import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import KonvaCanvas from "./KonvaCanvas";
import LoginOverlay from "./LoginOverlay";

const Layout = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

  return (
    <div className="layout-container">
      <Header onLoginClick={handleLoginOpen} />

      <main>
        <KonvaCanvas />

        {children}
      </main>

      <Footer />

      <LoginOverlay
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Layout;
