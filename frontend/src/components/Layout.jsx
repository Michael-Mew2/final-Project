import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import KonvaCanvas from "./KonvaCanvas";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Header */}
      <Header />

      {/* Hauptbereich */}
      <main>
        {/* Canvas */}
        <KonvaCanvas />

        {/* Dynamischer Inhalt */}
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
