import { ProductsPageProps } from '../Products';
import { ProductAdd } from '../ProductAdd/ProductAdd';
import { ProductsPageType } from '../../../shared/models/all.types';

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
