import { api, delay } from "./api";

export const AUTH_ENDPOINTS = {
  login: (data: { email: string; password: string }) => api.post("/auth/login", data),
  register: (data: { name: string; email: string; password: string }) => api.post("/auth/register", data),
  forgot: (data: { email: string }) => api.post("/auth/forgot-password", data),
  reset: (data: { token: string; password: string }) => api.post("/auth/reset-password", data),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

// Mock — replace by calling AUTH_ENDPOINTS when backend is ready
export async function mockLogin(email: string, _password: string) {
  return delay({ token: "mock-token", user: { email, name: email.split("@")[0] } }, 600);
}
