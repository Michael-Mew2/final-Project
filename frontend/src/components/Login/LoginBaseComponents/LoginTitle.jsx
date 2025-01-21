import { Title } from "@mantine/core";
import * as React from "react";
import { useLoginStore } from "../../../stores";
import { LoginAlerts } from "./LoginAlerts";

export function LoginTitle() {
  const { backendError } = useLoginStore();
  return (
    <>
      <Title order={3} mt="lg" mb="lg" style={{ textTransform: "uppercase" }}>
        Log in!
      </Title>
      {backendError && <LoginAlerts />}
    </>
  );
}
