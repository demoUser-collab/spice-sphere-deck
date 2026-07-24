import axios from "axios";

/**
 * Centralized API client. Points at a placeholder base URL — swap
 * VITE_API_BASE_URL when a real REST backend is available.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("rh_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Simulated latency for mock services
export const delay = <T>(data: T, ms = 350) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));
