import { useTranslation } from 'react-i18next';
import { MultipleFieldErrors, ValidateResult } from 'react-hook-form';
import { JwtPayload } from '../models/shared.types';
import {
  LoginData,
  LoginResponse,
  SignInData,
  SignUpData,
} from '../models/auth.types';
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

  /**
   * Compare current date and access token expire date.
   * @returns Auth access validity
   */
  const isAuthenticated = () => {
    return true; // DOTO fix
    // if (accessToken) {
    //   const decodedJWT: JwtPayload = jwtDecode(accessToken);
    //   if (new Date(decodedJWT.exp * 1000) > new Date()) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }
  };

  const signIn = async (data: LoginData): Promise<SignInData | undefined> => {
    if (data) {
      return await fetchData(`auth/signin`, {
        method: 'POST',
        body: data,
      });
    }
  };

  const signUp = async (data: LoginData): Promise<SignUpData | undefined> => {
    if (data) {
      return await fetchData(`auth/signup`, {
        method: 'POST',
        body: data,
      });
    }
  };

  return {
    isAuthenticated,
    signIn,
    signUp,
  };
};
