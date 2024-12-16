import { Navbar, Button, Group } from "@mantine/core";

const LoggedInNav = ({ onLogout }) => {
  return (




    <Navbar height={60} p="md" style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Links */}
      <Group>
        <Button variant="subtle" color="blue">
          Dashboard
        </Button>
        <Button variant="subtle" color="blue">
          Profile
        </Button>
      </Group>





      {/* Rechts */}
      <Group>
        <Button color="red" onClick={onLogout}>
          Logout
        </Button>
      </Group>
    </Navbar>
  );
};

export default LoggedInNav;
