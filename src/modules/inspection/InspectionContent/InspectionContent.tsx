import { ProductsPageProps } from '../Inspection';
import { InspectionContentType } from '../../../shared/models/all.types';
import InspectionAll from '../InspectionAll/InspectionAll';
import { InspectionAdd } from '../InspectionAdd/InspectionAdd';
import InspectionReport from '../InspectionAdd/InspectionReport';
import { Box } from '@mui/material';

const InspectionContent = ({ type }: ProductsPageProps) => {
  const ContentComponent = (type: InspectionContentType) => {
    switch (type) {
      case InspectionContentType.All:
        return <InspectionAll />;
      case InspectionContentType.Add:
        return <InspectionAdd />;
      case InspectionContentType.Edit:
        return <div>Edit</div>;
      case InspectionContentType.Template:
        return (
          <Box className="w-[210mm]">
            <InspectionReport />
          </Box>
        );
      default:
        return <>Default</>;
    }
  };
  return <>{ContentComponent(type)}</>;
};

export default InspectionContent;
