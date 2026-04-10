import axios from "axios";

const API_URL = "http://localhost:3000";
export const apiClient = axios.create({ baseURL: API_URL });

export function setupAxiosInterceptors() {
  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log(`[AXIOS] No token found`);
      }
      return config;
    },
    (error) => {
      console.error("[AXIOS] Request error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(
        `[AXIOS] ${error.response?.status} ${error.response?.config?.url}`,
        error.response?.data
      );
      return Promise.reject(error);
    }
  );
}
