import { create } from 'zustand';

import { Account } from '../models/all.types';

export interface UserState {
  account: Account | undefined;
  setAccount: (account: Account | undefined) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  account: undefined,
  setAccount: (accountData: Account | undefined) =>
    set({ account: accountData }),
}));
