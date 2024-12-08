import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { refreshTokenAPI } from "./auth.api";
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DEV_URL,
});

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
  (response) => response, // If response is valid, return it as is
  async (error) => {
    const { response } = error;
    console.log("Response Interceptor", response);
    const {
      setIsAuthenticated,
      clearAuthState,
      refreshToken,
      token,
      setToken,
      setRefreshToken,
    } = useAuthStore();
    const navigate = useNavigate();

    // If the token is expired (or other authentication error)
    if (response?.status === 401) {
      if (!token || !refreshToken) {
        // If there's no token or refresh token, log out and redirect to login
        clearAuthState();
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/error", {
          state: { message: "Session expired. Please log in again." },
        });

        return Promise.reject(error);
      }

      try {
        // Try refreshing the token
        const refreshResponse = await refreshTokenAPI(refreshToken, token);
        // On success, store the new token and set auth state
        setToken(refreshResponse.data.accessToken);
        setRefreshToken(refreshResponse.data.refreshToken);
        setIsAuthenticated(true);

        // Retry the original request with the new token
        error.config.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.data.accessToken}`;
        return axios(error.config); // Retry the failed request
      } catch (refreshError) {
        // If refresh token fails, log the user out and redirect to login page
        clearAuthState();
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/error", {
          state: {
            message: "Unable to refresh your session. Please log in again.",
          },
        });

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// todo: clone mot client rieng stream
//chatgpt: https://chatgpt.com/c/6745a1f1-50b4-8000-81f6-c86fd88d32d3
export default apiClient;
