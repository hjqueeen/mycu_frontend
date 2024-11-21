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

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

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
