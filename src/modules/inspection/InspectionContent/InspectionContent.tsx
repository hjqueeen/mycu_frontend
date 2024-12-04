import { ProductsPageProps } from '../Inspection';
import { InspectionContentType } from '../../../shared/models/all.types';
import InspectionAll from '../InspectionAll/InspectionAll';
import { InspectionAdd } from '../InspectionAdd/InspectionAdd';

const InspectionContent = ({ type }: ProductsPageProps) => {
  const ContentComponent = (type: InspectionContentType) => {
    switch (type) {
      case InspectionContentType.All:
        return <InspectionAll />;
      case InspectionContentType.Add:
        return <InspectionAdd />;
      case InspectionContentType.Edit:
        return <>Edit</>;

      default:
        return <>Default</>;
    }
  };
  return <>{ContentComponent(type)}</>;
};

export default InspectionContent;
