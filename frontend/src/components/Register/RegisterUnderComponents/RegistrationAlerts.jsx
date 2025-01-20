import { Alert } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useRegisterStore } from "../../../stores";

export function RegistrationAlerts() {
  const { successMessage, backendError } = useRegisterStore();
  
  return (
    <>
      {backendError && (
        <Alert
          icon={<IconAlertCircle />}
          title="Registration failed"
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
          title="Registration successful"
          color="green"
          mb="lg"
        >
          {successMessage}
        </Alert>
      )}
    </>
  );
}