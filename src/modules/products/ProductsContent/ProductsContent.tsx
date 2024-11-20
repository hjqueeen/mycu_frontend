import { ProductsPageProps, ProductsPageType } from '..';
import { ProductAdd } from '../ProductAdd/ProductAdd';

const ProductsContent = ({ type }: ProductsPageProps) => {
  console.log('ProductsContent', type);

  const ContentComponent = (type: ProductsPageType) => {
    switch (type) {
      case ProductsPageType.All:
        return <>All</>;
      case ProductsPageType.Add:
        return <ProductAdd />;
      case ProductsPageType.Edit:
        return <>Edit</>;

      default:
        return <>Default</>;
    }
  };
  return <>{ContentComponent(type)}</>;
};

export default ProductsContent;
