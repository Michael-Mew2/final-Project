import { Container, Group, Title, Button, Menu } from "@mantine/core";

const LoggedInNav = ({ onLogout }) => {
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
        <Title order={3} style={{ fontWeight: "bold" }}>
          pixel-together
        </Title>
        <Group spacing="sm">
          <Button variant="subtle" size="md">
            Dashboard
          </Button>
          <Button variant="subtle" size="md">
            Team
          </Button>
          <Menu>
            <Menu.Target>
              <Button variant="default" size="md">
                Mein Konto
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Profil</Menu.Item>
              <Menu.Item>Account-Einstellungen</Menu.Item>
              <Menu.Item color="red" onClick={onLogout}>
                Ausloggen
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
};

export default LoggedInNav;

