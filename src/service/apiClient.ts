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
    console.log("Interceptor Token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
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
      console.log("Response Interceptor status", response?.status);

      if (!token || !refreshToken) {
        // If there's no token or refresh token, log out and redirect to login
        clearAuthState();
        navigate("/auth/sign-in"); // Use react-router navigation instead of window.location.href
        return Promise.reject(error);
      }

      try {
        // Try refreshing the token
        const refreshResponse = await refreshTokenAPI(refreshToken, token);
        console.log("Response Interceptor refreshResponse", refreshResponse);
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
        console.error("Token refresh failed:", refreshError);
        clearAuthState();
        navigate("/auth/sign-in"); // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// todo: clone mot client rieng stream
//chatgpt: https://chatgpt.com/c/6745a1f1-50b4-8000-81f6-c86fd88d32d3
export default apiClient;
