import * as React from "react";
import { Alert } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useLoginStore } from "../../../stores";

export function LoginAlerts() {
  const { backendError, successMessage } = useLoginStore();

  return (
    <>
      {backendError && (
        <Alert
          icon={<IconAlertCircle />}
          title="Login failed"
          color="red"
          mb="lg"
        >
          {Array.isArray(backendError) && backendError.length > 1 ? (
            <ul className="errorList">
              {backendError.map((error, index) => (
                <li key={index} className="error-item">
                  {error}
                </li>
              ))}
            </ul>
          ) : (
            backendError
          )}
        </Alert>
      )}
      {successMessage && (
        <Alert
          icon={<IconCheck />}
          title="New Password requested!"
          color="green"
          mb="lg"
        >
          {successMessage}
        </Alert>
      )}
    </>
  );
}
