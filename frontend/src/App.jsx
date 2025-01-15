import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import dotenv  from "dotenv";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import Layout from "./components/Layout"

import { MantineProvider } from "@mantine/core";
// import TestComponent from "./components/TestComponent";

// dotenv.config();

export default function App() {
  return (
    <MantineProvider>
      <Layout/>
    </MantineProvider>
  );
}
