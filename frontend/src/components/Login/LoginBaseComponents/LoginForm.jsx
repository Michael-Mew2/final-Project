import * as React from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Anchor,
} from "@mantine/core";
import { useLoginStore, useRegisterStore } from "../../../stores";
import { IconArrowRight, IconHeart, IconX } from "@tabler/icons-react";

export function LoginForm({ onSubmit }) {
  const { setShowRegisterMenu } = useRegisterStore();
  const { setShowForgotPassword } = useLoginStore();

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="lg">
        <TextInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email-address"
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          name="password"
          required
        />
        <Anchor
          onClick={(e) => {
            e.preventDefault();
            setShowForgotPassword(true);
          }}
          size="sm"
        >
          Forgot Password
        </Anchor>
        <Group position="apart" mt="xl">
          <Button
            variant="light"
            color="red"
            onClick={() => setShowRegisterMenu(false)}
            rightSection={<IconX size={20} />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="teal"
            rightSection={<IconArrowRight size={20} />}
          >
            Log in!
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
