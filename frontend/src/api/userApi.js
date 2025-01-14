import * as React from "react";

const BASE_URL = /* process.env.REACT_APP_API_BASE_URL || */ "http://localhost:3000";

export const registerApi = async (username, email, password, birthdate) => {
  try {
    console.log(BASE_URL);

    const response = await fetch(BASE_URL + "/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password, birthdate }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Überprüfen des HTTP-Statuscodes
    if (!response.ok) {
      // Hier kannst du ein eigenes Fehlerhandling für andere Statuscodes einbauen
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    if (response.status === 201) {
      return console.log("Registration successful!!");
    } else if (response.status === 409) {
      return console.log("User already exists");
    } else if (response.status === 226) {
      return console.log("Username already taken!");
    } else {
      throw new Error("Registration failed!");
    }
  } catch (error) {
    console.log(error);
  }
};
