import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Products } from '../modules/products/Products';
import { ProductsPageType } from '../shared/models/all.types';

export const ProductsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Products type={ProductsPageType.Default} />} />
      <Route path="/add" element={<Products type={ProductsPageType.Add} />} />
      <Route path="/all" element={<Products type={ProductsPageType.All} />} />
      <Route path="/edit" element={<Products type={ProductsPageType.Edit} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
