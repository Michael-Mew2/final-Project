import React, { useState } from "react";
import {
  Container,
  Group,
  Title,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { Sun, Moon, DotsVertical } from "tabler-icons-react";
import "./header.css";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const goToRegister = () => navigate("/sign?tab=signup");
  const goToLogin = () => navigate("/sign?tab=signin");

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.style.backgroundColor = darkMode ? "#1a1b1e" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#1a1b1e";
  };

  const handleLogout = () => setIsLoggedIn(false);

  return (
    <header className="header">
      <Container className="header-container">
        {/* Title */}
        <Title order={3} className="header-title" onClick={() => navigate("/")}>
          pixel-together
        </Title>

        {/* Right Group */}
        <Group className="header-group">
          {/* Dark Mode Toggle */}
          <ActionIcon onClick={toggleDarkMode} size="lg" className="header-icon">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>

          {/* Navigation Menu */}
          <Menu shadow="md" width={250}>
            <Menu.Target>
              <ActionIcon size="lg" className="header-icon">
                <DotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {isLoggedIn ? (
                <>
                  <Menu.Label>Hallo, Admin!</Menu.Label>
                  <Menu.Item onClick={handleLogout} color="red">
                    Logout
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item onClick={goToLogin}>Login</Menu.Item>
                  <Menu.Item onClick={goToRegister}>Registrieren</Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </header>
  );
};

export default HeaderComponent;
