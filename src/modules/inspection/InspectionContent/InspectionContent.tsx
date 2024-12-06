import { ProductsPageProps } from '../Inspection';
import { InspectionContentType } from '../../../shared/models/all.types';
import InspectionAll from '../InspectionAll/InspectionAll';
import { InspectionAdd } from '../InspectionAdd/InspectionAdd';
import InspectionReport from '../InspectionAdd/InspectionReport';

const InspectionContent = ({ type }: ProductsPageProps) => {
  const ContentComponent = (type: InspectionContentType) => {
    switch (type) {
      case InspectionContentType.All:
        return <InspectionAll />;
      case InspectionContentType.Add:
        return <InspectionAdd />;
      case InspectionContentType.Edit:
        return <div>Edit</div>;
      // case InspectionContentType.Template:
      //   return <InspectionReport />;
      default:
        return <>Default</>;
    }
  };
  return <>{ContentComponent(type)}</>;
};

export default InspectionContent;
