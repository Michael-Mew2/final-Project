import * as React from "react";
import { Paper, Overlay, Container, Button } from "@mantine/core";
import { useRegisterStore } from "../../stores/index.js";
import { registerApi } from "../../api/userApi.js";
import { RegisterForm } from "./RegisterUnderComponents/RegisterForm.jsx";
import { RegisterTitle } from "./RegisterUnderComponents/RegisterTitle.jsx";

// ==========

// ----------

export default function Register() {
  const {
    successMessage,
    backendError,
    setSuccessMessage,
    setBackendError,
    setShowRegisterMenu,
  } = useRegisterStore();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const birthdate = data.get("birthdate");
    const formattedDate = new Date(birthdate).toLocaleDateString("en-CA");
    // console.log(formattedDate);

    try {
      setBackendError(null);
      setSuccessMessage(null);
      const response = await registerApi(
        username,
        email,
        password,
        formattedDate
      );
      console.log("Registrierung abgeschlossen!");
      setSuccessMessage(
        "Registration successful! Please check your email to confirm your account."
      );
      setBackendError(null);
      e.target.reset();
    } catch (error) {
      setBackendError(error.message.split(", "));
      setSuccessMessage(null);
    }

    // setShowRegisterMenu(false); // Schließt das Registrierungsmenü
  };

  return (
    <>
      <Overlay
        opacity={0.6}
        color="#000"
        zIndex={1}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Container
        size="xs"
        px="md"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          ta="left"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            width: "90%",
            maxWidth: "600px",
            maxHeight: "76vh",
            overflowY: "auto",
            // backgroundColor: theme.colorScheme === "dark" ? theme.color.dark[7] : theme.white,
            // color: theme.colorScheme === "dark" ? theme.white : theme.black,
          }}
        >
          <RegisterTitle />
          {successMessage ? (
            <Button
              variant="filled"
              color="teal"
              onClick={() => setShowRegisterMenu(false)}
            >
              Nice!
            </Button>
          ) : (
            <RegisterForm onSubmit={handleRegisterSubmit} />
          )}
        </Paper>
      </Container>
    </>
  );
}
