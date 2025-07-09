import { Layout, PageType } from '../../shared/components/Layout/Layout';
import { ShippingContentType } from '../../shared/models/all.types';
import ShippingAdd from './ShippingAdd';
import ShippingEdit from './ShippingEdit';

export type PageProps = {
  type: ShippingContentType;
};
export const ShippingPage = ({ type }: PageProps) => {
  const ContentComponent = () => {
    switch (type) {
      // case ShippingContentType.All:
      //   return <InspectionAll />;
      case ShippingContentType.Add:
        return (
          <>
            <ShippingAdd />
          </>
        );
      case ShippingContentType.Edit:
        return <ShippingEdit />;

      default:
        return <>Default</>;
    }
  };

  return <Layout pageType={PageType.Shipping} mainGrid={ContentComponent()} />;
};
