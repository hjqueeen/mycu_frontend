import { useTranslation } from 'react-i18next';
import { MultipleFieldErrors, ValidateResult } from 'react-hook-form';
import { JwtPayload } from '../models/shared.types';
import { LoginData, LoginResponse, SignUpData } from '../models/auth.types';
import { jwtDecode } from 'jwt-decode';
import { useFetch } from './use-fetch.hook';
import { AuthState, useAuthStore } from '../store/use-auth.store';

// Password reg expressions
// const regExpLower = new RegExp('.*[a-z].*');
export const regExpNumber = new RegExp('.*\\d.*');
export const regExpSpecial = new RegExp(
  '.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'
);
export const regExpUpper = new RegExp('.*[A-Z].*');

export const useAuth = () => {
  const { fetchData } = useFetch();
  // Auth store state
  const { accessToken } = useAuthStore();
  /**
   * Compare current date and access token expire date.
   * @returns Auth access validity
   */
  const isAuthenticated = () => {
    if (accessToken) {
      return isAccessTokenValid(accessToken);
    } else {
      return false;
    }
  };

  const isAccessTokenValid = (accessToken: string) => {
    const decodedJWT: JwtPayload = jwtDecode(accessToken);

    if (new Date(decodedJWT.exp * 1000) > new Date()) {
      return true;
    } else {
      return false;
    }
  };

  const signIn = async (
    data: LoginData
  ): Promise<LoginResponse | undefined> => {
    if (data) {
      return await fetchData(`auth/signin`, {
        method: 'POST',
        body: data,
      });
    }
  };

  const signUp = async (
    data: SignUpData
  ): Promise<LoginResponse | undefined> => {
    if (data) {
      return await fetchData(`auth/signup`, {
        method: 'POST',
        body: data,
      });
    }
  };

  return {
    isAuthenticated,
    isAccessTokenValid,
    signIn,
    signUp,
  };
};
