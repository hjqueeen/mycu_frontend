import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../modules/dashboard';
import { Inventory } from '../modules/Inventory';
import LoginPage from '../modules/login';
import { Products } from '../modules/products';
import { Shipping } from '../modules/shipping';
import { UserManagement } from '../modules/user_management';
import { Layout, PageType } from '../shared/components/Layout/Layout';
import { useAuth } from '../shared/hooks/use-auth.hook';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  let { isAuthenticated } = useAuth();
  console.log('AppRouter');

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <Layout
            pageType={PageType.Dashboard}
            rightComponent={<Dashboard />}
            rightComponentName={PageType.Dashboard}
          />
        }
      />
      <Route
        path="/inventory"
        element={
          <Layout
            pageType={PageType.Inventory}
            rightComponent={<Inventory />}
            rightComponentName={PageType.Inventory}
          />
        }
      />
      <Route
        path="/products"
        element={
          <Layout
            pageType={PageType.Products}
            rightComponent={<Products />}
            rightComponentName={PageType.Products}
          />
        }
      />
      <Route
        path="/shipping"
        element={
          <Layout
            pageType={PageType.Shipping}
            rightComponent={<Shipping />}
            rightComponentName={PageType.Shipping}
          />
        }
      />
      <Route
        path="/user_management"
        element={
          <Layout
            pageType={PageType.UserManagement}
            rightComponent={<UserManagement />}
            rightComponentName={PageType.UserManagement}
          />
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
