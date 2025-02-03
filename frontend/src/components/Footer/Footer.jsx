import React from "react";
import { Container, Group, Text, ActionIcon } from "@mantine/core";
import { BrandGithub, BrandLinkedin, BrandTwitter } from "tabler-icons-react";
import "./footer.css";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <Container className="footer-container">
        <Group position="apart" align="center">
          <Text size="sm" className="footer-text">
            © {new Date().getFullYear()} pixel-together.
          </Text>

          <Group spacing="xs">
            <ActionIcon
              size="lg"
              component="a"
              href="https://github.com/Michael-Mew2/final-Project"
              target="_blank"
              title="GitHub"
              className="footer-icon"
            >
              <BrandGithub size={20} />
            </ActionIcon>

            <ActionIcon
              size="lg"
              component="a"
              href="https://linkedin.com/"
              target="_blank"
              title="LinkedIn"
              className="footer-icon"
            >
              <BrandLinkedin size={20} />
            </ActionIcon>

            <ActionIcon
              size="lg"
              component="a"
              href="https://twitter.com/"
              target="_blank"
              title="Twitter"
              className="footer-icon"
            >
              <BrandTwitter size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </footer>
  );
};

export default FooterComponent;
