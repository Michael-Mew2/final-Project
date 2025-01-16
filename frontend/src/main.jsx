import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import Layout from "./components/Layout";
import { ColorProvider } from "./components/FarbPalette/ColorStore";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider>
      <ColorProvider>
        <Layout />
      </ColorProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
