import * as React from "react";
import {
  Group,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconArrowRight, IconHeart, IconX } from "@tabler/icons-react";
import { PasswordInputWithStrength } from "./PasswordInputWithStrength";
import { RegistrationAlerts } from "./RegistrationAlerts";
import { useRegisterStore } from "../../../stores/";
import { useNavigate } from "react-router-dom";

export function RegisterForm({ onSubmit }) {
  const [password, setPassword] = React.useState("");
  const [checkPassword, setCheckPassword] = React.useState("");
  const navigate = useNavigate()
  const passwordsMatch = password === checkPassword && password.length > 0;


  const handleCancel = () => {
    navigate("/")
  }

  return (
    <form onSubmit={onSubmit}>
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
        <PasswordInputWithStrength
          password={password}
          setPassword={setPassword}
        />
        <PasswordInput
          withAsterisk
          required
          label="Confirm your password"
          placeholder="Confirm the password you set up"
          name="checkPassword"
          value={checkPassword}
          onChange={(event) => setCheckPassword(event.currentTarget.value)}
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
          color="green"
          required
          label="I accept the terms and conditions of this community and accept the resulting consequences if I break the rules"
        />
        <Checkbox
          color="teal"
          required
          label="I accept the data agreement of our community"
        />
        <Checkbox
          required
          color="cyan"
          label="I promise and swear that I'm at least 14 years old!"
        />
        <Group position="apart" mt="xl">
          <Button
            variant="light"
            color="red"
            onClick={handleCancel}
            rightSection={<IconX size={20} />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="teal"
            rightSection={<IconArrowRight size={20} />}
          >
            Sign up!
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
