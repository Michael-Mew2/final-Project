import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import Layout from "./components/Layout"
import { ColorProvider } from "./components/FarbPalette/ColorStore";

import { MantineProvider } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider>
      <ColorProvider>
        <Layout />
      </ColorProvider>
    </MantineProvider>
  );
}
