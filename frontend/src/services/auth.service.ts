import axios from "axios";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
  avatarUrl?: string;
  session?: {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    expiresAt?: number;
  };
}

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  role: string;
}

const AUTH_API = "http://localhost:3000/auth";

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const response = await axios.post(`${AUTH_API}/login`, payload);
  return response.data;
}

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  const response = await axios.post(`${AUTH_API}/register`, payload);
  return response.data;
}

export function saveAuthUser(user: AuthUser) {
  localStorage.setItem("auth_user", JSON.stringify(user));
  if (user.session?.accessToken) {
    localStorage.setItem("access_token", user.session.accessToken);
  }
  if (user.session?.refreshToken) {
    localStorage.setItem("refresh_token", user.session.refreshToken);
  }
}

export function getAuthUser(): AuthUser | null {
  const stored = localStorage.getItem("auth_user");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthUser() {
  localStorage.removeItem("auth_user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
