import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../modules/dashboard';
import { Inventory } from '../modules/Inventory';
import LoginPage from '../modules/login';
import { Products } from '../modules/products';
import ProductNav from '../modules/products/ProductNav/ProductNav';
import { Shipping } from '../modules/shipping';
import { UserManagement } from '../modules/user_management';
import { Layout, PageType } from '../shared/components/Layout/Layout';
import { ProductsRouter } from './ProductsRouter';

export const AppRouter = () => {
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
      <Route path="/products/*" element={<ProductsRouter />} />
      <Route path="/shipping" element={<Shipping />} />
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
