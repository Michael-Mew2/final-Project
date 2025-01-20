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

const HeaderComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Registrierung abgeschlossen!");
    setShowRegisterMenu(false);
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
      {showRegisterMenu && (
  <>
    <Overlay opacity={0.6} color="#000" zIndex={1000} />
    <Paper
      shadow="xl"
      radius="md"
      p="xl"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1100,
        width: "90%",
        maxWidth: "400px",
      }}
    >
      <Title order={3} align="center" mb="lg">
        Registrieren
      </Title>
      <form onSubmit={handleRegisterSubmit}>
        <TextInput
          label="Name"
          placeholder="Dein Name"
          name="name"
          required
          mb="sm"
        />
        <TextInput
          label="E-Mail"
          placeholder="Deine E-Mail-Adresse"
          type="email"
          name="email"
          required
          mb="sm"
        />
        <PasswordInput
          label="Passwort"
          placeholder="Dein Passwort"
          name="password"
          required
          mb="sm"
        />
        <Group position="apart" mt="xl">
          <Button
            variant="default"
            onClick={() => setShowRegisterMenu(false)}
          >
            Abbrechen
          </Button>
          <Button type="submit">Registrieren</Button>
        </Group>
      </form>
    </Paper>
  </>
)}
    </div>
  );
};

export default HeaderComponent;
