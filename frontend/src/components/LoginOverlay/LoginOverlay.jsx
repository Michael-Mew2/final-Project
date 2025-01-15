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

  const handleLogin = () => {

    if (!username || !password) {
      setError("Bitte Benutzername und Passwort eingeben.");
      return;
    }

    setError("");

    if (username === "admin" && password === "password") {
      onLogin({ username });
      onClose();
    } else {
      setError("Ungültige Login-Daten. Bitte erneut versuchen.");
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Einloggen"
      centered
    >
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
