import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useTransition } from 'react';
import i18next from 'i18next';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { themeLight, useTheme } from './shared/hooks/use-theme.hook';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  const queryClient = new QueryClient();
  // useEffect(() => {
  //   i18next.changeLanguage('ko');
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <Router>
          <AppRouter />
        </Router>
      </CssBaseline>
    </QueryClientProvider>
  );
}

export default App;
