import { create } from 'zustand';
import { JwtPayload } from '../models/shared.types';

// Models

export interface AuthState {
  accessToken: string | null;
  dialogTermsOfService: boolean;
  loginTimeout: number;
  payload: JwtPayload | undefined;
  resetAuthStoreData: () => void;
  setAccessToken: (accessToken: string | null) => void;
  setDialogTermsOfService: (dialogTermsOfService: boolean) => void;
  setLoginTimeout: (loginTimeout: number) => void;
  setPayload: (payload: JwtPayload | undefined) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('frontend:accessToken') || null,
  dialogTermsOfService: false,
  loginTimeout: 0,
  payload: undefined,
  resetAuthStoreData: () =>
    set((state: AuthState) => ({
      ...state,
      accessToken: null,
      dialogTermsOfService: false,
      loginTimeout: 0,
      payload: undefined,
    })),
  setAccessToken: (accessToken: string | null) => {
    accessToken && localStorage.setItem('frontend:accessToken', accessToken);
    !accessToken && localStorage.removeItem('frontend:accessToken');
    set({ accessToken });
  },
  setDialogTermsOfService: (dialogTermsOfService: boolean) =>
    set({ dialogTermsOfService }),
  setLoginTimeout: (loginTimeout: number) => set({ loginTimeout }),
  setPayload: (payload: JwtPayload | undefined) => set({ payload }),
}));
