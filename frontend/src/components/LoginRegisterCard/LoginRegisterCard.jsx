import * as React from "react";
import LoginRegisterTabs from "./LoginRegisterTabs.jsx";
import { Paper, Overlay, Container } from "@mantine/core";

export default function LoginRegisterCard() {
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
        //   overflowY: "auto",
        }}
      >
        <LoginRegisterTabs />
      </Paper>
    </Container>
  </>
  );
}
