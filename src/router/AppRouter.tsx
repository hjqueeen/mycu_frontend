import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardNav from '../modules/dashboard/components/DashboardNav';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { Inventory } from '../modules/inventory/Inventory';
import { Shipping } from '../modules/shipping/Shipping';
import { UserManagement } from '../modules/user_management/UserManagement';
import { Layout, PageType } from '../shared/components/Layout/Layout';
import { ProductsRouter } from './ProductsRouter';
import SignIn from '../modules/sign-in-up/SignIn';
import SignUp from '../modules/sign-in-up/SignUp';
import { ProtectedRoute } from './ProtectedRoute';
import { useEffect } from 'react';
import { useAuthStore } from '../shared/store/use-auth.store';
import { useMutation } from 'react-query';
import { useUserStore } from '../shared/store/use-user.store';
import { unstable_batchedUpdates } from 'react-dom';
import { useFetch } from '../shared/hooks/use-fetch.hook';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../shared/models/shared.types';
import { useUsersHttp } from '../shared/hooks/use-users-http.hook';

export const AppRouter = () => {
  const { handleError, handleRetry } = useFetch();
  const { userGet } = useUsersHttp();
  // User store state
  const { account, setAccount } = useUserStore();

  // GET user data mutation
  const userGetMutation = useMutation((id: string) => userGet(id), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    onSettled: (data, error) => {
      if (data) {
        setAccount(data.account);
        // setProfile(data.profile);
        // setTheme(data.theme ?? Theme.Light);
      }
      if (error) {
        const errRes = error?.response;
        if (errRes) {
          handleError(errRes.status);
        }
      }
    },
  });

  // ####### //
  // EFFECTS //
  // ####### //

  // Check for valid access token on application init
  useEffect(() => {
    const accessToken = localStorage.getItem('frontend:accessToken');
    if (accessToken) {
      unstable_batchedUpdates(() => {
        const accessToken = localStorage.getItem('frontend:accessToken');
        if (accessToken) {
          const decodedJWT: JwtPayload = jwtDecode(accessToken);
          decodedJWT && userGetMutation.mutate(decodedJWT.id);
        }
      });
    }
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout pageType={PageType.Dashboard} mainGrid={<Dashboard />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <Layout pageType={PageType.Inventory} mainGrid={<Inventory />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/*"
        element={
          <ProtectedRoute>
            <ProductsRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user_management"
        element={
          <ProtectedRoute>
            <Layout
              pageType={PageType.UserManagement}
              mainGrid={<UserManagement />}
            />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
