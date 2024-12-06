import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useTransition } from 'react';
import i18next from 'i18next';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './shared/theme/customizations';
import AppTheme from './shared/theme/AppTheme';
import { LicenseInfo } from '@mui/x-license-pro';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};
// Set mui license key before app render
process.env.REACT_APP_MUI_LICENSE_KEY &&
  LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY);

function App() {
  const queryClient = new QueryClient();
  // useEffect(() => {
  //   i18next.changeLanguage('ko');
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppTheme themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme>
          <Router>
            <AppRouter />
          </Router>
        </CssBaseline>
      </AppTheme>
    </QueryClientProvider>
  );
}

export default App;
