import { create } from 'zustand';
import { JwtPayload } from '../models/shared.types';

// Models
export interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('frontend:accessToken') || null,
  setAccessToken: (accessToken: string | null) => {
    accessToken && localStorage.setItem('frontend:accessToken', accessToken);
    !accessToken && localStorage.removeItem('frontend:accessToken');
    set({ accessToken });
  },
}));
