import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { refreshTokenAPI } from "./auth.api";
import { getEnv } from "../util/getEnv";

const apiClient = axios.create({
  baseURL: getEnv("VITE_SERVER_DEV_URL"),
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
    const { token } = useAuthStore.getState()
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
    const { token, refreshToken, setToken, setRefreshToken, clearAuthState } = useAuthStore.getState();

    // Handle token expiry (401)
    if (response?.status === 401) {
      if (!token || !refreshToken) {
        clearAuthState();
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

        processQueue(null, newAccessToken);

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        clearAuthState();

        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
export default apiClient;
