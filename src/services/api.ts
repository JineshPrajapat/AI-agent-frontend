// src/services/api.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ApiError } from "../utils/types/apiTypes";

const API_BASE_URL = "https://8c54-223-184-246-88.ngrok-free.app";

// Create axios instance with proper typing
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor with correct typing
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    const apiError: ApiError = {
      message: error.response?.data?.message || "An unexpected error occurred",
      status: error.response?.status,
      details: error.response?.data,
    };

    return Promise.reject(apiError);
  }
);

export default api;

// // src/services/api.ts
// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://8c54-223-184-246-88.ngrok-free.app", // Replace with your backend base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to add the JWT token to every request
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("access_token");
//     if (accessToken && config.headers) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors (optional, but good practice)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // You can add global error handling here, e.g., redirecting on 401
//     return Promise.reject(error);
//   }
// );

// export default api;
