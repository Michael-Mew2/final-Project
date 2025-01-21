import * as React from "react";
import { Button } from "@mantine/core";
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
    </>
  );
}
