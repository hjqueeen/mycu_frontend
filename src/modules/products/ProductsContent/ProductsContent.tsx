import { ProductsPageProps } from '../Products';
import { ProductAdd } from '../ProductAdd/ProductAdd';
import { ProductsContentType } from '../../../shared/models/all.types';

const ProductsContent = ({ type }: ProductsPageProps) => {
  console.log('ProductsContent', type);

  const ContentComponent = (type: ProductsContentType) => {
    switch (type) {
      case ProductsContentType.All:
        return <>All</>;
      case ProductsContentType.Add:
        return <ProductAdd />;
      case ProductsContentType.Edit:
        return <>Edit</>;

      default:
        return <>Default</>;
    }
  };
  return <>{ContentComponent(type)}</>;
};

export default ProductsContent;
