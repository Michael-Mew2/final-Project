import React, { useState } from "react";
import { Modal, TextInput, Button, Stack, Text } from "@mantine/core";
import { useLoginStore } from "../../../stores";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const { setShowForgotPassword } = useLoginStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Fehler beim Anfordern des Passwort-Reset-Links:", error);
      setStatus("error");
    }
  };

  return (
    <Modal
      opened={true}
      onClose={() => setShowForgotPassword(false)}
      title="Passwort zurücksetzen"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="lg">
          <TextInput
            label="E-Mail-Adresse"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Gib deine E-Mail-Adresse ein"
            required
          />
          <Button type="submit" color="teal">
            Reset-Link senden
          </Button>
          {status === "success" && (
            <Text color="green">Überprüfe deine E-Mail für den Reset-Link!</Text>
          )}
          {status === "error" && (
            <Text color="red">
              Fehler: Überprüfe die E-Mail-Adresse und versuche es erneut.
            </Text>
          )}
        </Stack>
      </form>
    </Modal>
  );
};

export default PasswordResetRequest;