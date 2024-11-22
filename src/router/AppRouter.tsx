import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardNav from '../modules/dashboard/components/DashboardNav';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { Inventory } from '../modules/inventory/Inventory';
import SignIn from '../modules/sign-in-up/SignUp';
import { Shipping } from '../modules/shipping/Shipping';
import { UserManagement } from '../modules/user_management';
import { Layout, PageType } from '../shared/components/Layout/Layout';
import { ProductsRouter } from './ProductsRouter';
import SignUp from '../modules/sign-in-up/SignUp';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <Layout pageType={PageType.Dashboard} mainGrid={<Dashboard />} />
        }
      />
      <Route
        path="/inventory"
        element={
          <Layout pageType={PageType.Inventory} mainGrid={<Inventory />} />
        }
      />
      <Route path="/products/*" element={<ProductsRouter />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route
        path="/user_management"
        element={
          <Layout
            pageType={PageType.UserManagement}
            mainGrid={<UserManagement />}
          />
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
