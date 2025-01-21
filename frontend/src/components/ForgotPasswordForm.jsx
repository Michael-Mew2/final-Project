import { TextInput, Button, Stack, Group } from "@mantine/core";
import { useLoginStore } from "../stores";
import { IconArrowLeft, IconUserQuestion } from "@tabler/icons-react";
import { resetPasswordRequestApi } from "../api/userApi";

export function ForgotPasswordForm() {
  const { setShowForgotPassword, setBackendError, setSuccessMessage } =
    useLoginStore();

  async function handleForgotPasswordSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      setBackendError(null);
      setSuccessMessage(null);

      const response = await resetPasswordRequestApi(email);

      console.log("new Password requested!");
      setSuccessMessage(
        "New Password has been requested. You'll shortly receive an email with instructions on how to reset your password."
      );
      setBackendError(null);
      e.target.reset();
    } catch (error) {
      setBackendError(error.message.split(", "));
      setSuccessMessage(null);
    }
  }

  return (
    <form onSubmit={handleForgotPasswordSubmit}>
      <Stack spacing="lg">
        <TextInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          name="email"
          required
        />
        <Group position="apart" mt="md">
          <Button
            variant="light"
            color="grey"
            onClick={() => setShowForgotPassword(false)}
            leftSection={<IconArrowLeft size={20} />}
          >
            Back to Login
          </Button>
          <Button
            type="submit"
            variant="filled"
            color="purple"
            rightSection={<IconUserQuestion size={20} />}
          >
            Reset Password
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
