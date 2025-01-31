import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EmailVerification = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const checkENV = import.meta.env.VITE_API_NODE_ENV === "production";
  const BASE_URL = checkENV
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_DEV_URL;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/validate-email/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Invalid or expired token.");
        }

        const data = await response.json();
        if (data.success) {
          setStatus("success");
          setMessage(data.message || "Email successfully verified!");
        } else {
          setStatus("error");
          setMessage(data.message || "Invalid or expired token.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(
          error.message ||
            "An error occurred during verification. Please try again."
        );
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      {status === "loading" && <p>Verifying, please wait...</p>}
      {status === "success" && <p style={{ color: "green" }}>{message}</p>}
      {status === "error" && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default EmailVerification;
