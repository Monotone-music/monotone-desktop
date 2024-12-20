import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../interface/Auth';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            token: null,
            refreshToken: null,
            message: null,
            bitrate: null,
            isPremium: false,
            setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
            setToken: (token) => set({ token }),
            setRefreshToken: (refreshToken) => set({refreshToken}),
            setMessage: (message) => set({ message: message }),
            clearAuthState: () => set({ isAuthenticated: false, token: null, message: null, refreshToken: null, bitrate: null }),
            setBitrate: (bitrate) => set({bitrate}),
            setIsPremium: (isPremium) => set({isPremium})

          }),
          {
            name: 'auth-storage', // Key used for storing in localStorage
          }
    )
  );