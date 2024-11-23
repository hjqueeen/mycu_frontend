import { create } from 'zustand';

import {
  Account,
  ExtendedTreeItemProps,
  HeaderMenu,
} from '../models/all.types';

export interface UserState {
  account: Account | undefined;
  navUserGroups: ExtendedTreeItemProps[];
  headerMenu: HeaderMenu;
  setAccount: (account: Account | undefined) => void;
  setNavUserGroups: (groups: ExtendedTreeItemProps[]) => void;
  setHeaderMenu: (headerMenu: HeaderMenu) => void;
}

export const useUserStore = create<UserState>((set) => ({
  account: undefined,
  navUserGroups: [],
  headerMenu: {
    dashboard: true,
    products: true,
    inventory: false,
    shipping: false,
    user_management: false,
  },
  setAccount: (accountData: Account | undefined) =>
    set({ account: accountData }),
  setNavUserGroups: (groups: ExtendedTreeItemProps[]) =>
    set({ navUserGroups: groups }),
  setHeaderMenu: (menu: HeaderMenu) => set({ headerMenu: menu }),
}));
