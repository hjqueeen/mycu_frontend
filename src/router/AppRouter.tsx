import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardNav from '../modules/dashboard/components/DashboardNav';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { Inventory } from '../modules/inventory/Inventory';
import { Shipping } from '../modules/shipping/Shipping';
import { UserManagement } from '../modules/user_management/UserManagement';
import { Layout, PageType } from '../shared/components/Layout/Layout';
import SignIn from '../modules/sign-in-up/SignIn';
import SignUp from '../modules/sign-in-up/SignUp';
import { ProtectedRoute } from './ProtectedRoute';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../shared/store/use-auth.store';
import { useMutation } from 'react-query';
import { useUserStore } from '../shared/store/use-user.store';
import { unstable_batchedUpdates } from 'react-dom';
import { useFetch } from '../shared/hooks/use-fetch.hook';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../shared/models/shared.types';
import { useUsersHttp } from '../shared/hooks/use-users-http.hook';
import { HeaderMenu } from '../shared/models/all.types';
import Cart from '../modules/cart/Cart';
import Checkout from '../modules/cart/Checkout';
import { AccountPage } from '../modules/account/Account';
import { Password } from '../modules/account/Password';
import { InspectionRouter } from './InspectionRouter';

export const AppRouter = () => {
  const { handleError, handleRetry } = useFetch();
  const { userGet } = useUsersHttp();
  // User store state
  const { account, headerMenu, setAccount, setHeaderMenu } = useUserStore();
  const { accessToken } = useAuthStore();

  // GET user data mutation
  const userGetMutation = useMutation((id: string) => userGet(id), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    onSettled: (data, error) => {
      if (data) {
        setAccount(data.account);
        setHeaderMenu(data.headerMenu);
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
      {headerMenu?.dashboard && (
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout pageType={PageType.Dashboard} mainGrid={<Dashboard />} />
            </ProtectedRoute>
          }
        />
      )}

      {headerMenu?.inventory && (
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout pageType={PageType.Inventory} mainGrid={<Inventory />} />
            </ProtectedRoute>
          }
        />
      )}
      {headerMenu?.products && (
        <Route
          path="/inspection/*"
          element={
            <ProtectedRoute>
              <InspectionRouter />
            </ProtectedRoute>
          }
        />
      )}
      {headerMenu?.shipping && (
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
      )}
      {headerMenu?.user_management && (
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
      )}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Layout pageType={PageType.Cart} mainGrid={<Cart />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Layout pageType={PageType.Checkout} mainGrid={<Checkout />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Layout
              pageType={PageType.Account}
              mainGrid={<AccountPage defaultValue={account} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/password"
        element={
          <ProtectedRoute>
            <Layout pageType={PageType.Password} mainGrid={<Password />} />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
