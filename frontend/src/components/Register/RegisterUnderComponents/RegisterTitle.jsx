import { Title, Alert } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useRegisterStore } from "../../../stores";
import { RegistrationAlerts } from "./RegistrationAlerts";

export function RegisterTitle() {
  const { successMessage, backendError } = useRegisterStore();
  const alertDefaultIcon = <IconHeart />;
  return (
    <>
      <Title order={3} mt="lg" mb="lg" style={{ textTransform: "uppercase" }}>
        Join us!
      </Title>
      {backendError || successMessage ? (
        <RegistrationAlerts />
      ) : (
        <Alert
          variant="light"
          color="cyan"
          title="Welcome to our Community!"
          icon={alertDefaultIcon}
          mb="lg"
        >
          Just one small step left to join the greatest community. Just create
          an small account and start placing your pixel in our world.
        </Alert>
      )}
    </>
  );
}
