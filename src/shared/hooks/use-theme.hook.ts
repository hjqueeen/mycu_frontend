import { createTheme, Theme } from '@mui/material/styles';

// Models
import { Theme as ETheme } from '../models/shared.types';
import { SharedState, useSharedStore } from '../store/use-shared.store';

// Stores

declare module '@mui/material/styles' {}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
    xxxl: true;
    xxxxl: true;
  }
  interface PaletteOptions {
    change: {
      medium: string;
      light: string;
      dark: string;
      text: string;
    };
    bg: {
      card: string;
      chat: string;
      header: string;
      hover: string;
      switch: string;
      tooltip: string;
      darkgray: string;
      data: string;
      newheader: string;
      newNav: string;
      newNavImage: string;
    };
    border: {
      app: string;
      divider: string;
      header: string;
      light: string;
      strong: string;
      switch: string;
    };
    orange: {
      light: string;
      main: string;
    };
    pengueen: {
      darkgray: string;
      darkblue: string;
      gray: string;
    };
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
    xxxl: 1920,
    xxxxl: 2560,
  },
};

const error = {
  light: '#f5433626',
  main: '#f54336',
};

// const primary = {
//   dark: '#008be2',
//   light: '#309eed26',
//   main: '#309eed'
// };

const orange = {
  light: '#ffc1a384',
  main: '#ec5d1d',
};

const pengueen = {
  darkblue: '#202455',
  darkgray: '#444D58',
  gray: '#8FA4B7',
};

const primaryDark = {
  dark: '#008be2',
  light: '#22333e',
  main: '#309eed',
};

const primaryLight = {
  dark: '#008be2',
  light: '#e0f1fc',
  main: '#309eed',
};

const secondary = {
  main: '#EB5C0B',
};

const success = {
  light: '#48d55e26',
  main: '#48d55e',
};

const warning = {
  light: '#feab2926',
  main: '#feab29',
};

const typography = {
  box: {
    fontSize: 14,
  },
  fontFamily: "'Open Sans', 'sans-serif'",
  fontSize: 14,
};

export const themeDark = createTheme({
  breakpoints,
  palette: {
    background: {
      default: '#171717',
      paper: '#202020',
    },
    change: {
      light: '#EBF4DF',
      medium: '#A3CF70',
      dark: '#77B72B',
      text: '#73B126',
    },
    bg: {
      card: '#2b2b2b',
      chat: '#22222233',
      header: '#202020e6',
      // hover: '#2d2d2d'
      hover: 'rgba(255, 255, 255, 0.08)',
      switch: '#2b2b2b',
      tooltip: '#444D58',
      darkgray: '#444D59',
      data: '#0F0F0F',
      newheader: '#D2D3DD',
      newNav: '#D5ECFC',
      newNavImage: '#82C4F4',
    },
    border: {
      app: '#3a3a3a',
      divider: '#3a3a3a',
      header: '#2a2a2a',
      light: '#2a2a2a',
      strong: '#ffffff26',
      switch: '#3a3a3a',
    },
    error,
    info: primaryDark,
    mode: 'dark',
    orange,
    pengueen,
    primary: primaryDark,
    secondary,
    success,
    warning,
  },
  typography,
});

export const themeLight = createTheme({
  breakpoints,
  palette: {
    background: {
      default: '#fafcfc',
    },
    change: {
      light: '#EBF4DF',
      medium: '#A3CF70',
      dark: '#77B72B',
      text: '#73B126',
    },
    bg: {
      card: '#f3f6f9',
      chat: '#f3f6f933',
      header: '#ffffffe6',
      hover: 'rgba(68, 77, 88, 0.04)',
      switch: '#f3f6f980',
      tooltip: '#444D58',
      darkgray: '#444D59',
      data: '#ffffff',
      newheader: '#D2D3DD',
      newNav: '#D5ECFC',
      newNavImage: '#82C4F4',
    },
    border: {
      app: '#e9e9f0',
      divider: '#dfe5eb',
      header: '#e5e7eb',
      light: '#f3f6f9',
      strong: '#00000026',
      switch: '#e5e7eb40',
    },
    error,
    info: primaryLight,
    mode: 'light',
    orange,
    pengueen,
    primary: primaryLight,
    secondary,
    success,
    text: {
      primary: '#444d58',
      secondary: '#8ea3b6',
    },
    warning,
  },
  typography,
});

export const useTheme = () => {
  // Shared store state
  const [theme] = useSharedStore((state: SharedState) => [state.theme]);

  /**
   * Returns active mui theme.
   * @returns Active MUI theme
   */
  const activeThemeGet = (): Theme => {
    switch (theme) {
      case ETheme.Dark:
        return themeDark;
      default:
        return themeLight;
    }
  };

  return {
    activeThemeGet,
  };
};
