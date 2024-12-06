import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../interface/Auth';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            token: null,
            refreshToken: null,
            error: null,
            setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
            setToken: (token) => set({ token }),
            setRefreshToken: (refreshToken) => set({refreshToken}),
            setError: (errorMessage) => set({ error: errorMessage }),
            clearAuthState: () => set({ isAuthenticated: false, token: null, error: null }),
          }),
          {
            name: 'auth-storage', // Key used for storing in localStorage
          }
    )
  );