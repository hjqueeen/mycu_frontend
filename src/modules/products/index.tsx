import {
  Layout,
  LayoutProps,
  PageType,
} from '../../shared/components/Layout/Layout';
import ProductNav from './ProductNav/ProductNav';
import ProductsContent from './ProductsContent/ProductsContent';

export enum ProductsPageType {
  Add = 'ADD',
  All = 'ALL',
  Default = 'Default',
  Edit = 'EDIT',
}

export type ProductsPageProps = {
  type: ProductsPageType;
};

export const Products = ({ type }: ProductsPageProps) => {
  return (
    <Layout
      pageType={PageType.Products}
      leftComponent={<ProductNav type={type} />}
      rightComponent={<ProductsContent type={type} />}
      rightComponentName={PageType.Products}
    />
  );
};
