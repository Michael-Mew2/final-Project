import React from "react";
import {
  Group,
  Title,
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Overlay,
} from "@mantine/core";
export default function Register() {
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Registrierung abgeschlossen!");
    setShowRegisterMenu(false); // Schließt das Registrierungsmenü
  };

  return (
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
  );
}
