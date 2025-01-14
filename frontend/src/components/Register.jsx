import React, { useState } from "react";
import { IconX, IconCheck, IconHeart } from "@tabler/icons-react";
import {
  Group,
  Title,
  Button,
  TextInput,
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  Paper,
  Overlay,
  Alert,
  Checkbox,
  Stack,
  Container,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useRegisterStore } from "../stores";
import { registerApi } from "../api/userApi.js";

// ==========

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;
  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });
  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 2);
}

// ----------

export default function Register() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { setShowRegisterMenu } = useRegisterStore();

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  const strength = getStrength(password);

  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password")
    const birthdate = data.get("birthdate")
    const formattedDate = new Date(birthdate).toLocaleDateString("en-CA");
    console.log(formattedDate);
    await registerApi(username, email, password, formattedDate);
    console.log("Registrierung abgeschlossen!");
    // setShowRegisterMenu(false); // Schließt das Registrierungsmenü
  };

  const passwordsMatch = password === checkPassword && password.length > 0;

  const alertDefaultIcon = <IconHeart />;

  return (
    <>
      <Overlay opacity={0.6} color="#000" zIndex={1} />
      <Container size="xs" px="md">
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
          }}
        >
          <Title order={3} mb="lg" style={{textTransform: "uppercase"}}>
            Join us!
          </Title>
          <Alert
            variant="light"
            color="green"
            title="Welcome to our Community!"
            icon={alertDefaultIcon}
            mb="lg"
          >
            Just one small step left to join the greatest community. Just create
            an small account and start placing your pixel in our world.
          </Alert>
          <form onSubmit={handleRegisterSubmit}>
            <Stack spacing="lg">
              <TextInput
                label="Username"
                placeholder="chose an unique username"
                name="username"
                required
              />
              <TextInput
                label="Email"
                placeholder="Enter your email-address"
                type="email"
                name="email"
                required
              />
              <Popover
                opened={popoverOpened}
                position="bottom"
                width="target"
                transitionProps={{ transition: "pop" }}
              >
                <Popover.Target>
                  <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlur={() => setPopoverOpened(false)}
                  >
                    <PasswordInput
                      withAsterisk
                      label="Your Password"
                      name="password"
                      placeholder="Set up a unique password"
                      value={password}
                      required
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                    />
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <Progress color={color} value={strength} size={5} mb="xs" />
                  <PasswordRequirement
                    label="Includes at least 6 characters"
                    meets={password.length > 5}
                  />
                  {checks}
                </Popover.Dropdown>
              </Popover>
              <PasswordInput
                withAsterisk
                required
                label="Confirm your password"
                placeholder="Confirm the password you set up"
                name="checkPassword"
                value={checkPassword}
                onChange={(event) =>
                  setCheckPassword(event.currentTarget.value)
                }
                error={
                  !passwordsMatch && checkPassword.length > 0
                    ? "Passwords do not match!"
                    : null
                }
              />
              <DateInput
                clearable
                label="Birthdate"
                name="birthdate"
                placeholder="Please enter your birthdate"
                maxDate={new Date()}
              />
              <Checkbox
                required
                label="I accept the terms and conditions of this community and accept the resulting consequences if I break the rules"
              />
              <Checkbox
                required
                label="I accept the data agreement of our community"
              />
              <Checkbox
                required
                label="I promise and swear that I'm at least 14 years old!"
              />
              <Group position="apart" mt="xl">
                <Button
                  variant="default"
                  onClick={() => setShowRegisterMenu(false)}
                >
                  Abort
                </Button>
                <Button type="submit">Sign up!</Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}
