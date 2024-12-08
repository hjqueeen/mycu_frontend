import { ProductsPageProps } from '../Inspection';
import {
  InspectionContentType,
  InspectionViewType,
} from '../../../shared/models/all.types';
import InspectionsList from '../InspectionsList/InspectionsList';
import { InspectionAdd } from '../InspectionAdd/InspectionAdd';
import InspectionReport from '../InspectionAdd/InspectionReport';
import { Box } from '@mui/material';
import ShippingEdit from '../../shipping/ShippingEdit';

const InspectionContent = ({ type }: ProductsPageProps) => {
  const ContentComponent = (type: InspectionContentType) => {
    switch (type) {
      case InspectionContentType.Add:
        return <InspectionAdd />;
      case InspectionContentType.Edit:
        return <ShippingEdit />;
      case InspectionContentType.Template:
        return (
          <Box className="w-[210mm]">
            <InspectionReport />
          </Box>
        );
      case InspectionContentType.CountryView:
        return <InspectionsList pageType={InspectionViewType.Country} />;
      case InspectionContentType.InspectionsView:
        return <InspectionsList pageType={InspectionViewType.Inspections} />;
      case InspectionContentType.ProductsView:
        return <InspectionsList pageType={InspectionViewType.Products} />;
      default:
        return <>Default</>;
    }
  };
  return <>{ContentComponent(type)}</>;
};

export default InspectionContent;
