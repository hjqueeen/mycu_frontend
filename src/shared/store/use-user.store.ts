import { create } from 'zustand';

import {
  Account,
  ExtendedTreeItemProps,
  HeaderMenu,
} from '../models/all.types';

export interface UserState {
  account: Account | any | undefined;
  navUserGroups: ExtendedTreeItemProps[];
  headerMenu: HeaderMenu;
  setAccount: (account: Account | any | undefined) => void;
  setNavUserGroups: (groups: ExtendedTreeItemProps[]) => void;
  setHeaderMenu: (headerMenu: HeaderMenu) => void;
}

export const useUserStore = create<UserState>((set) => ({
  account: undefined,
  navUserGroups: [],
  headerMenu: {
    dashboard: true,
    products: true,
    inventory: true,
    shipping: true,
    user_management: true,
    alarm: true,
  },
  setAccount: (accountData: Account | any | undefined) =>
    set({ account: accountData }),
  setNavUserGroups: (groups: ExtendedTreeItemProps[]) =>
    set({ navUserGroups: groups }),
  setHeaderMenu: (menu: HeaderMenu) => set({ headerMenu: menu }),
}));
