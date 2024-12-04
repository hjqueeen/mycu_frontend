import { ProductsPageProps } from '../Products';
import { ProductAdd } from '../ProductAdd/ProductAdd';
import { ProductsContentType } from '../../../shared/models/all.types';
import ProductGrid from '../ProductGrid';

const ProductsContent = ({ type }: ProductsPageProps) => {
  const ContentComponent = (type: ProductsContentType) => {
    switch (type) {
      case ProductsContentType.All:
        return <ProductGrid />;
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
