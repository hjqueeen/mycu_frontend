import {
  Layout,
  LayoutProps,
  PageType,
} from '../../shared/components/Layout/Layout';
import { ProductsPageType } from '../../shared/models/all.types';
import ProductNav from './ProductNav/ProductNav';
import ProductsContent from './ProductsContent/ProductsContent';

export type ProductsPageProps = {
  type: ProductsPageType;
};

export const Products = ({ type }: ProductsPageProps) => {
  return (
    <Layout
      pageType={PageType.Products}
      contentType={type}
      sideMenu={<ProductNav type={type} />}
      mainGrid={<ProductsContent type={type} />}
      rightComponentName={PageType.Products}
    />
  );
};
