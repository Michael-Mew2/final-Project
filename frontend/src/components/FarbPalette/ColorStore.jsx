import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorStore = () => useContext(ColorContext);
