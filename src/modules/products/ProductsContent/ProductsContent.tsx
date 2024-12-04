import { ProductsPageProps } from '../Products';
import { ProductAdd } from '../ProductAdd/ProductAdd';
import { ProductsContentType } from '../../../shared/models/all.types';
import ProductAll from '../ProductAll/ProductAll';

const ProductsContent = ({ type }: ProductsPageProps) => {
  const ContentComponent = (type: ProductsContentType) => {
    switch (type) {
      case ProductsContentType.All:
        return <ProductAll />;
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
