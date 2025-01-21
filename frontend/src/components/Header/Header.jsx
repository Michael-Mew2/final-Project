import React, { useState } from "react";
import {
  Container,
  Group,
  Title,
  ActionIcon,
  Button,
  Menu,
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Overlay,
} from "@mantine/core";
import { Sun, Moon, DotsVertical } from "tabler-icons-react";
import "@mantine/core/styles.css";
import "./header.css";
import Register from "../Register/Register";
import useRegisterStore from "../../stores/useRegisterStore.js";
import LoginRegisterCard from "../LoginRegisterCard/LoginRegisterCard.jsx";


const HeaderComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {showRegisterMenu, setShowRegisterMenu} = useRegisterStore();// Steuerung des Registrierungsmenüs

  const [error, setError] = useState("");

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.style.backgroundColor = darkMode ? "#1a1b1e" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#1a1b1e";
  };

  const handleLogin = () => {
    if (!username || !password) {
      setError("Bitte Benutzername und Passwort eingeben.");
      return;
    }

    setError("");

    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      setError("Ungültige Login-Daten. Bitte erneut versuchen.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div style={{ height: 70, padding: "0 16px", backgroundColor: "lightblue" }}>
      <Container
        size="xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* Title */}
        <Title order={3}>pixel-together</Title>

        {/* Group with Action Buttons */}
        <Group>
          {/* Dark Mode Toggle */}
          <ActionIcon onClick={toggleDarkMode} size="lg">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>

          {/* Navigation Menu */}
          <Menu shadow="md" width={250}>
            <Menu.Target>
              <ActionIcon size="lg">
                <DotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {isLoggedIn ? (
                <>
                  <Menu.Label>Hallo, Admin!</Menu.Label>
                  <Menu.Item onClick={handleLogout} color="red">
                    Logout
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Label>Login</Menu.Label>
                  <TextInput
                    label="Benutzername"
                    placeholder="Gib deinen Benutzernamen ein"
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                    required
                    mb="sm"
                  />
                  <PasswordInput
                    label="Passwort"
                    placeholder="Gib dein Passwort ein"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    required
                    mb="sm"
                  />
                  {error && (
                    <Text color="red" size="sm" mb="sm">
                      {error}
                    </Text>
                  )}
                  <Button fullWidth variant="filled" onClick={handleLogin}>
                    Einloggen
                  </Button>
                  <Menu.Item onClick={() => setShowRegisterMenu(true)}>
                    Registrieren
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>

      {/* Registration Menu */}
      {showRegisterMenu && (<LoginRegisterCard />)}
    </div>
  );
};

export default HeaderComponent;
