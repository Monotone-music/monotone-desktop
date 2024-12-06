import { ISignInForm } from "../interface/Auth";
import apiClient from "./apiClient"

// Authentication Related

export const signIn = async (body: ISignInForm): Promise<any> => {
    const response = await apiClient.post(`/auth/login`, body);
    return response.data;
}


// Token related
export const keepAlive = async (token: string): Promise<any> => {
    const response = await apiClient.post(`/auth/keep-alive`, {},
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
}

export const refreshTokenAPI = async (refreshToken: string, token: string ): Promise<any> => {
    const response = await apiClient.post(`/auth/refresh`, {
        refreshToken: refreshToken
    },
    { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}