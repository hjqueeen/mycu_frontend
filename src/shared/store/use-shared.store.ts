import { create } from 'zustand';

// Models
import {
  Alert,
  AlertAction,
  BreadcrumbPath,
  Notification,
  Theme,
} from '../models/shared.types';

// Models

export interface SharedState {
  breadcrumbs: BreadcrumbPath[];
  dashboard: boolean;
  newsCenter: boolean;
  workbench: boolean;
  userRouter: boolean;
  alert: Alert | undefined;
  alertAction: AlertAction | undefined;
  network: boolean;
  dialogContacts: boolean;
  dialogMarket: boolean;
  market: boolean;
  modalOpen: boolean;
  notification: Notification | undefined;
  theme: Theme;
  setBreadcrumbPath: (breadcrumbs: BreadcrumbPath[]) => void;
  setDashboard: (dashboard: boolean) => void;
  setNewsCenter: (newscenter: boolean) => void;
  setWorkbench: (workbench: boolean) => void;
  setUserRouter: (userRouter: boolean) => void;
  setAlert: (alert: Alert | undefined) => void;
  setAlertAction: (alertAction: AlertAction | undefined) => void;
  setDialogContacts: (dialogContacts: boolean) => void;
  setNetwork: (network: boolean) => void;
  setDialogMarket: (dialogMarket: boolean) => void;
  setMarket: (market: boolean) => void;
  setModalOpen: (modalOpen: boolean) => void;
  setNotification: (notification: Notification | undefined) => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Searches string tag in Theme enum
 * @param theme Theme string
 * @returns Valid Theme enum
 */
const getThemeEnumByStringVal = (theme: string) => {
  let foundTheme = Object.entries(Theme).find((enumKV) => enumKV[0] === theme);
  return foundTheme && foundTheme[1] ? foundTheme[1] : Theme.Light;
};

export const useSharedStore = create<SharedState>((set) => ({
  breadcrumbs: [],
  dashboard: false,
  newsCenter: false,
  workbench: false,
  userRouter: false,
  alert: undefined,
  alertAction: undefined,
  network: false,
  dialogContacts: false,
  dialogMarket: false,
  market: false,
  modalOpen: false,
  notification: undefined,
  trialExpired: null,
  theme: getThemeEnumByStringVal(localStorage.getItem('app:theme') || 'light'),
  setBreadcrumbPath: (breadcrumbs: BreadcrumbPath[]) => set({ breadcrumbs }),
  setDashboard: (dashboard: boolean) => set({ dashboard }),
  setNewsCenter: (newsCenter: boolean) => set({ newsCenter }),
  setWorkbench: (workbench: boolean) => set({ workbench }),
  setUserRouter: (userRouter: boolean) => set({ userRouter }),
  setAlert: (alert: Alert | undefined) => set({ alert }),
  setAlertAction: (alertAction: AlertAction | undefined) => {
    set({ alertAction });
    setTimeout(() => {
      set({ alertAction: undefined });
    }, 50);
  },
  setNetwork: (network: boolean) => set({ network }),
  setDialogContacts: (dialogContacts: boolean) => set({ dialogContacts }),
  setDialogMarket: (dialogMarket: boolean) => set({ dialogMarket }),
  setMarket: (market: boolean) => set({ market }),
  setModalOpen: (modalOpen: boolean) => {
    set({ modalOpen });
  },
  setNotification: (notification: Notification | undefined) =>
    set({ notification }),
  setTheme: (theme: Theme) => {
    set({ theme });
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('app:theme', theme);
  },
}));
