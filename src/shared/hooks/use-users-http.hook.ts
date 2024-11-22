import { useTranslation } from 'react-i18next';
import { MultipleFieldErrors, ValidateResult } from 'react-hook-form';
import { JwtPayload } from '../models/shared.types';
import { LoginData, LoginResponse, SignUpData } from '../models/auth.types';
import { jwtDecode } from 'jwt-decode';
import { useFetch } from './use-fetch.hook';
import { AuthState, useAuthStore } from '../store/use-auth.store';
import { Profile, FetchDataParams, User, Account } from '../models/all.types';

// Password reg expressions
// const regExpLower = new RegExp('.*[a-z].*');
export const regExpNumber = new RegExp('.*\\d.*');
export const regExpSpecial = new RegExp(
  '.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'
);
export const regExpUpper = new RegExp('.*[A-Z].*');

export const useUsersHttp = () => {
  const { fetchData } = useFetch();
  // Auth store state
  const { accessToken } = useAuthStore();
  /**
   * Get users.
   * @returns Users
   */
  const usersGet = async (params?: FetchDataParams): Promise<Profile[]> => {
    if (accessToken) {
      return await fetchData(`users`, {
        params,
      });
    }
    return [];
  };

  const userGet = async (
    id: string
  ): Promise<
    | {
        account: Account;
        // profile: Profile;
        // communities?: Community[];
        // theme?: Theme;
      }
    | undefined
  > => {
    if (id) {
      return await fetchData(`users/${id}`);
    }
    return undefined;
  };

  return {
    userGet,
    usersGet,
  };
};
