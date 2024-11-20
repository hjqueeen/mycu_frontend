import React from 'react';
import { ProductsPageProps, ProductsPageType } from '..';
import { ProductAdd } from '../ProductAdd/ProductAdd';

const ProductsContent = ({ type }: ProductsPageProps) => {
  const ContentComponent = (type: ProductsPageType) => {
    switch (type) {
      case ProductsPageType.All:
        return <></>;
      case ProductsPageType.Add:
        return <ProductAdd />;
      case ProductsPageType.Edit:
        return <></>;

      default:
        return <></>;
    }
  };
  return <>{ContentComponent(type)}</>;
};

export default ProductsContent;
