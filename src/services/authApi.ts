// src/services/authApi.ts
import api from "./api";
import {
  UserRegistrationData,
  LoginCredentials,
  LoginResponse,
  AuthCheckResponse,
  ApiError,
} from "../utils/types/apiTypes";

export const register = async (
  userData: UserRegistrationData
): Promise<{ msg: string; user_id: number }> => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("user_id", response.data.user_id.toString());
    localStorage.setItem("username", response.data.username);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
  } catch (error) {
    throw error as ApiError;
  }
};

export const checkAuth = async (): Promise<AuthCheckResponse> => {
  try {
    const response = await api.get("/auth/protected");
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
