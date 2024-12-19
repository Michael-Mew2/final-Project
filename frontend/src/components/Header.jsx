import React, { useState } from "react";
import { Container, Group, Title, ActionIcon, Drawer, Button } from "@mantine/core";
import { Sun, Moon, Menu } from "tabler-icons-react";
import "@mantine/core/styles.css";

const HeaderComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.style.backgroundColor = darkMode ? "#1a1b1e" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#1a1b1e";
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
        }}>

        <Title order={3}>pixel-together</Title>

        <ActionIcon onClick={toggleDarkMode} size="lg">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </ActionIcon>

        <ActionIcon onClick={() => setDrawerOpened(true)} size="lg">
          <Menu size={18} />
        </ActionIcon>

        <Drawer
            opened={drawerOpened}
            onClose={() => setDrawerOpened(false)}
  title="Navigation"
  padding="xl"
  size="md"
  styles={{ drawer: { zIndex: 1000 } }}
>
  <Button variant="subtle" fullWidth>
    Dashboard
  </Button>
  <Button variant="subtle" fullWidth>
    Team
  </Button>
  <Button variant="subtle" fullWidth>
    Einstellungen
  </Button>
</Drawer>

      </Container>
    </div>
  );
};

export default HeaderComponent;