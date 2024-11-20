import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useTransition } from 'react';
import i18next from 'i18next';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    i18next.changeLanguage('ko');
  }, []);

  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
