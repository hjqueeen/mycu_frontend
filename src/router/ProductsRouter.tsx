import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Products } from '../modules/products/Products';
import { ProductsContentType } from '../shared/models/all.types';

export const ProductsRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Products type={ProductsContentType.Default} />}
      />
      <Route
        path="/add"
        element={<Products type={ProductsContentType.Add} />}
      />
      <Route
        path="/all"
        element={<Products type={ProductsContentType.All} />}
      />
      <Route
        path="/edit"
        element={<Products type={ProductsContentType.Edit} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
