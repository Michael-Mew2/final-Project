import React, { useState } from "react";
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
} from "@mantine/core";

const LoginOverlay = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkENV = import.meta.env.VITE_API_NODE_ENV === "production";
  const BASE_URL = checkENV ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_DEV_URL;

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Bitte Benutzername und Passwort eingeben.");
      return;
    }

    try {
      setError("");

      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
        onClose();
      } else {
        setError(data.msg || "Fehler beim Einloggen.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ein unerwarteter Fehler ist aufgetreten.");
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Einloggen" centered>
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

      <Group position="apart" mt="md">
        <Button variant="default" onClick={onClose}>
          Abbrechen
        </Button>
        <Button variant="filled" onClick={handleLogin}>
          Einloggen
        </Button>
      </Group>
    </Modal>
  );
};

export default LoginOverlay;
