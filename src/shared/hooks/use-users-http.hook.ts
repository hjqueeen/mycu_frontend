import { useFetch } from './use-fetch.hook';
import { useAuthStore } from '../store/use-auth.store';
import {
  Profile,
  FetchDataParams,
  Account,
  ExtendedTreeItemProps,
  HeaderMenu,
  ResponseStandard,
} from '../models/all.types';

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
        headerMenu: HeaderMenu;
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

  const userGroupsGet = async (
    params?: FetchDataParams
  ): Promise<ExtendedTreeItemProps[]> => {
    if (accessToken) {
      return await fetchData(`user-group`, {
        params,
      });
    }
    return [];
  };

  const userEmailPatch = async (data: {
    id: string;
    email: string;
  }): Promise<ResponseStandard | undefined> => {
    if (accessToken) {
      return await fetchData(`users/email`, {
        method: 'PATCH',
        body: data,
      });
    }
  };

  const userProfilePatch = async (
    data: Partial<Account>
  ): Promise<ResponseStandard | undefined> => {
    if (accessToken) {
      return await fetchData(`users/profile`, {
        method: 'PATCH',
        body: data,
      });
    }
  };

  return {
    userGet,
    usersGet,
    userGroupsGet,
    userEmailPatch,
    userProfilePatch,
  };
};
