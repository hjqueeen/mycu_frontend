import { Layout, PageType } from '../../shared/components/Layout/Layout';
import { InspectionContentType } from '../../shared/models/all.types';
import InspectionContent from './InspectionContent/InspectionContent';

export type ProductsPageProps = {
  type: InspectionContentType;
};

export const Inspection = ({ type }: ProductsPageProps) => {
  return (
    <Layout
      pageType={PageType.Products}
      contentType={type}
      mainGrid={<InspectionContent type={type} />}
    />
  );
};
