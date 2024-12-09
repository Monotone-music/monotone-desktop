import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider } from "@chakra-ui/react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.scss";
import Home from "./pages/home/Home";
import Root from "./layout/rootLayout/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Album from "./pages/album/Album";
import AuthLayout from "./layout/authLayout/AuthLayout";
import SignIn from "./pages/auth/SignIn/SignIn";
import { useAuthStore } from "./store/useAuthStore";
import { keepAlive, refreshTokenAPI } from "./service/auth.api";
import Payment from "./pages/payment/Payment";
import Checkout from "./pages/checkout/Checkout";
import Error from "./pages/error/Error";
import Profile from "./pages/profile/Profile";

const queryClient = new QueryClient();

const AuthCheck = () => {
  const {
    setIsAuthenticated,
    setRefreshToken,
    setToken,
    clearAuthState,
    token,
    refreshToken,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (!token || !refreshToken) {
        clearAuthState();
        navigate("/auth/sign-in");
        return;
      }

      setIsLoading(true);
      try {
        const response = await keepAlive(token);
        if (response.status === "ok") {
          setIsAuthenticated(true);
          setToken(token);
        }
      } catch (error) {
        if (refreshToken) {
          try {
            const refreshResponse = await refreshTokenAPI(refreshToken, token);
            setToken(refreshResponse.data.accessToken);
            setRefreshToken(refreshResponse.data.refreshToken);
            setIsAuthenticated(true);
          } catch (refreshError) {
            clearAuthState();
            navigate("/auth/sign-in");
          }
        } else {
          clearAuthState();
          navigate("/auth/sign-in");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [
    clearAuthState,
    setIsAuthenticated,
    setToken,
    navigate,
    token,
    refreshToken,
  ]);


  return null;
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/auth/sign-in" replace />,
      },
      {
        path: "auth/sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/home",
    element: <Root />,
    children: [
      {
        path: "",
        element: (
          <>
            <AuthCheck /> {/* Add AuthCheck here to handle token checks */}
            <Home />
          </>
        ),
      },
      {
        path: "album/:albumId",
        element: (
          <>
            <AuthCheck />
            <Album />
          </>
        ),
      },
    ],
  },
  {
    path: "/payment",
    element: <Root />,
    children: [
      {
        path: "",
        element: (
          <>
            <AuthCheck />
            <Payment />
          </>
        ),
      },
      {
        path: "checkout",
        element: (
          <>
            <AuthCheck />
            <Checkout />
          </>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: <Root />,
    children: [
      {
        path: "",
        element: (
          <>
            <AuthCheck />
            <Profile />
          </>
        ),
      }
    ],
  },
  { path: "/error", element: <Error /> },
]);
