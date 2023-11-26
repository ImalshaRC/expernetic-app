import { LoginData, User } from "../types/types";
import { toast } from "react-toastify";
import axios from "../api/axios";

const Register_URL = "/Auth/register";
const LOGIN_URL = "/Auth/login";

export async function RegisterRequest(user: User) {
  try {
    const response = await axios.post(Register_URL, JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const err = error as { response: { status: number } };
    console.error("Error:", err);
  }
}

export async function LoginRequest(loginData: LoginData) {
  try {
    const response = await axios.post(LOGIN_URL, JSON.stringify(loginData), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAuthToken(response.data);

    return response;
  } catch (error) {
    const err = error as { response: { data: string } };
    toast.info(err.response.data);
    console.error("Error:", err);
  }
}

export const setAuthToken = (token: string): void => {
  localStorage.setItem("jwt-authToken", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("jwt-authToken");
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("jwt-authToken");
};
