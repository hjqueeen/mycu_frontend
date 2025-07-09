import { Navigate, Route, Routes } from 'react-router-dom';
import { ShippingPage } from '../modules/shipping/Shipping';
import { ShippingContentType } from '../shared/models/all.types';

export const ShippingRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ShippingPage type={ShippingContentType.Add} />}
      />
      <Route
        path="/add"
        element={<ShippingPage type={ShippingContentType.Add} />}
      />
      {/*  <Route
        path="/all"
        element={<ShippingPage type={ShippingContentType.All} />}
      /> */}
      <Route
        path="/edit"
        element={<ShippingPage type={ShippingContentType.Edit} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
