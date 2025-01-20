import * as React from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const registerApi = async (username, email, password, birthdate) => {
  try {
    // console.log(BASE_URL);

    const response = await fetch(BASE_URL + "/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password, birthdate }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        throw new Error(data.errors.join(", "));
      }
      throw new Error(data.msg || "Registration failed. Please try again later!")
    }
    return data;
  } catch (error) {
    throw error;
  }
};
