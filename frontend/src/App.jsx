import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Layout from "./components/Layout";
import { ColorProvider } from "./components/FarbPalette/ColorStore";
import { MantineProvider } from "@mantine/core";
import { useLoginStore } from "./stores";
import LoginRegisterCard from "./components/LoginRegisterCard/LoginRegisterCard";
import CanvasPage from "./components/CanvasPage";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLoginStore();

  if (!isLoggedIn) {
    return <Navigate to="/sign" />;
  }
};

export default function App() {
  return (
    <MantineProvider>
      <ColorProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Home />} /> */}
            <Route path="/sign" element={<LoginRegisterCard />} />
            <Route
              path="canvas"
              element={
                <ProtectedRoute>
                  <CanvasPage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="validate-email/:token"
              element={<EmailVerification />}
            /> */}
            {/* <Route path="reset/:token" element={<PasswordReset />} /> */}
            {/* <Route path="rules" element={<SiteRules />} /> */}
            {/* <Route path="data" element={<DataAgreement />} /> */}
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </ColorProvider>
    </MantineProvider>
  );
}
