import { create } from 'zustand';

import { Account, ExtendedTreeItemProps } from '../models/all.types';

export interface UserState {
  account: Account | undefined;
  navUserGroups: ExtendedTreeItemProps[];
  setAccount: (account: Account | undefined) => void;
  setNavUserGroups: (groups: ExtendedTreeItemProps[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  account: undefined,
  navUserGroups: [],
  setAccount: (accountData: Account | undefined) =>
    set({ account: accountData }),
  setNavUserGroups: (groups: ExtendedTreeItemProps[]) =>
    set({ navUserGroups: groups }),
}));
