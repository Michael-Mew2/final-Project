import { loginApi } from "../../api/userApi";
import { useLoginStore, useRegisterStore } from "../../stores";
import { LoginTitle } from "./LoginBaseComponents/LoginTitle";
import { LoginForm } from "./LoginBaseComponents/LoginForm";
import { ForgotPasswordForm } from "../ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

export default function Login() {
  const { setShowRegisterMenu } = useRegisterStore();
  const {
    isLoggedIn,
    setIsLoggedIn,
    setBackendError,
    setSuccessMessage,
    showForgotPassword,
  } = useLoginStore();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setBackendError(null);
      setSuccessMessage(null);
      const response = await loginApi(email, password);
      console.log("Registration successful!");
      setIsLoggedIn(true);
      e.target.reset();
      navigate("/canvas");
    } catch (error) {
      setSuccessMessage(null);
      setBackendError(error.message.split(", "));
    }
  };

  return (
    <>
      <LoginTitle />
      {isLoggedIn ? (
        <Button variant="filled" color="orange" onClick={handleCancel}>
          Return
        </Button>
      ) : showForgotPassword ? (
        <ForgotPasswordForm />
      ) : (
        <LoginForm onSubmit={handleLoginSubmit} />
      )}
    </>
  );
}
