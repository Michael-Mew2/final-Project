import "./App.css";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import Layout from "./components/Layout"

import { MantineProvider } from "@mantine/core";
import TestComponent from "./components/TestComponent";

export default function App() {
  return (
    <MantineProvider>
      <Layout/>
    </MantineProvider>
  );
}
