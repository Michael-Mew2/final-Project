import * as React from "react";
import Cookies from "js-cookie"

const checkENV = import.meta.env.VITE_API_NODE_ENV === "production";
const BASE_URL = checkENV ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_DEV_URL;

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
      throw new Error(
        data.msg || "Registration failed. Please try again later!"
      );
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async (email, password) => {
  try {
    const response = await fetch(BASE_URL + "/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
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
      throw new Error(data.msg || "Logging in failed, please try again later.");
    }

    const token = Cookies.get("jwt");
    if (token) {
      console.log("Token successfully stored:", token);
    } else {
      // Alternativ: Token aus den Response-Headers holen und manuell setzen
      Cookies.set('jwt', data.token, {
        secure: true,
        sameSite: 'none',
        path: '/'
      });
    }


    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordRequestApi = async (email) => {
  try {
    const response = await fetch(BASE_URL + "/users/password-reset-request", {
      method: "POST",
      body: JSON.stringify({ email }),
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
      throw new Error(data.msg || "Logging in failed, please try again later.");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
