import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { refreshTokenAPI } from "./auth.api";
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DEV_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response, // Return successful response
  async (error) => {
    const { response } = error;
    const { token, refreshToken, setToken, setRefreshToken, clearAuthState } = useAuthStore();
    const navigate = useNavigate();

    // Handle token expiry (401)
    if (response?.status === 401) {
      if (!token || !refreshToken) {
        clearAuthState();
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/error", { state: { message: "Session expired. Please log in again." } });
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await refreshTokenAPI(refreshToken, token);
        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken;

        setToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        processQueue(null, newAccessToken);

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        clearAuthState();
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/error", { state: { message: "Unable to refresh your session. Please log in again." } });

        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// todo: clone mot client rieng stream
//chatgpt: https://chatgpt.com/c/6745a1f1-50b4-8000-81f6-c86fd88d32d3
export default apiClient;
