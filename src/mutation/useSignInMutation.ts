import { useMutation } from "@tanstack/react-query";
import { signIn } from "../service/auth.api";
import { useAuthStore } from "../store/useAuthStore";
import { ISignInForm } from "../interface/Auth";
import { AxiosResponse } from "axios";



export const useSignInMutation = () => {
    const { setIsAuthenticated, setRefreshToken,setToken, bitrate ,setMessage, setBitrate, setIsPremium } = useAuthStore();
  
    return useMutation({
    mutationFn: (data: ISignInForm) => signIn(data),
      onSuccess: (data:AxiosResponse) => {
        setIsAuthenticated(true);
        setToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken)
        setBitrate(data.data.bitrate)
        if(data.data.bitrate === "320kbps" || bitrate === "lossless"){
          setIsPremium(true)
        }else{
          setIsPremium(false)
        }
   

      },
      onError: (error: any) => {
        // Set error state in Zustand on failed login
        setMessage(error?.response?.data?.message || 'Login failed');
        console.error('Login failed', error);
      },
    });
  };