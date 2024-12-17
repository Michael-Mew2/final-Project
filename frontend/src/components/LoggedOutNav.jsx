import React from "react";
import { Header, Container, Group, Button, Title } from "@mantine/core";

const LoggedOutNav = ({ onLogin, onRegister }) => {
  return (
    <Header height={70} px="md" style={{ backgroundColor: "lightblue" }}>
      <Container
        size="xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}>
      
        <Title order={3} style={{ fontWeight: "bold" }}>
          pixel-together
        </Title>

        <Group spacing="sm">
          <Button variant="default" size="md" onClick={onLogin}>
            Einloggen
          </Button>
          <Button variant="filled" size="md" onClick={onRegister}>
            Registrieren
          </Button>
        </Group>
      </Container>
    </Header>
  );
};

export default LoggedOutNav;