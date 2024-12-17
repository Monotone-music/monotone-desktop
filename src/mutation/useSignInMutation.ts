import { useMutation } from "@tanstack/react-query";
import { signIn } from "../service/auth.api";
import { useAuthStore } from "../store/useAuthStore";
import { ISignInForm } from "../interface/Auth";
import { AxiosResponse } from "axios";



export const useSignInMutation = () => {
    const { setIsAuthenticated, setRefreshToken,setToken, setMessage } = useAuthStore();
  
    return useMutation({
    mutationFn: (data: ISignInForm) => signIn(data),
      onSuccess: (data:AxiosResponse) => {
        setIsAuthenticated(true);
        setToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken)
      },
      onError: (error: any) => {
        // Set error state in Zustand on failed login
        setMessage(error?.response?.data?.message || 'Login failed');
        console.error('Login failed', error);
      },
    });
  };