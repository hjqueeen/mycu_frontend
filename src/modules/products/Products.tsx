import {
  Layout,
  LayoutProps,
  PageType,
} from '../../shared/components/Layout/Layout';
import { ProductsContentType } from '../../shared/models/all.types';
import ProductNav from './ProductNav/ProductNav';
import ProductsContent from './ProductsContent/ProductsContent';

export type ProductsPageProps = {
  type: ProductsContentType;
};

export const Products = ({ type }: ProductsPageProps) => {
  return (
    <Layout
      pageType={PageType.Products}
      contentType={type}
      mainGrid={<ProductsContent type={type} />}
    />
  );
};
