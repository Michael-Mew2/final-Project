import React from "react";
import { Container, Group, Text, ActionIcon } from "@mantine/core";
import { BrandGithub, BrandLinkedin, BrandTwitter } from "tabler-icons-react";
import "./footer.css";

const FooterComponent = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "20px 0" }}>
      <Container>
        <Group position="apart" align="center">
          <Text size="sm" color="dimmed">
            © {new Date().getFullYear()} pixel-together.
          </Text>

          <Group spacing="xs">
            <ActionIcon
              size="lg"
              component="a"
              href="https://github.com/Michael-Mew2/final-Project"
              target="_blank"
              title="GitHub"
            >
              <BrandGithub size={20} />
            </ActionIcon>

            <ActionIcon
              size="lg"
              component="a"
              href="https://linkedin.com/"
              target="_blank"
              title="LinkedIn"
            >
              <BrandLinkedin size={20} />
            </ActionIcon>

            <ActionIcon
              size="lg"
              component="a"
              href="https://twitter.com/"
              target="_blank"
              title="Twitter"
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
