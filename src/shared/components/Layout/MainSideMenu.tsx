import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import DashboardNav from '../../../modules/dashboard/components/DashboardNav';
import { InspectionContentType } from '../../models/all.types';
import { PageType } from './Layout';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

type Props = {
  pageType: PageType;
  contentType?: InspectionContentType;
};

const MainSideMenu = ({ contentType, pageType }: Props) => {
  let defaultExpandedItems;
  let defaultSelectedItems;
  const newLocal = pageType === PageType.Products;
  if (pageType === PageType.Dashboard) {
    defaultExpandedItems = undefined;
    defaultSelectedItems = undefined;
  } else if (newLocal) {
    switch (contentType) {
      case InspectionContentType.All:
        defaultExpandedItems = ['1', '1.1'];
        defaultSelectedItems = '1.1';
        break;
      case InspectionContentType.Add:
        defaultExpandedItems = ['1', '1.2'];
        defaultSelectedItems = '1.2';
        break;
      case InspectionContentType.Edit:
        defaultExpandedItems = ['1', '1.3'];
        defaultSelectedItems = '1.3';
        break;
      default:
        defaultExpandedItems = ['1'];
        defaultSelectedItems = '1';
        break;
    }
  } else if (pageType === PageType.Inventory) {
    defaultExpandedItems = ['2'];
    defaultSelectedItems = '2';
  } else if (pageType === PageType.Shipping) {
    defaultExpandedItems = ['3'];
    defaultSelectedItems = '3';
  } else if (pageType === PageType.UserManagement) {
    defaultExpandedItems = ['4'];
    defaultSelectedItems = '4';
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          top: '64px',
          height: 'calc(100vh - 64px)',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
        <DashboardNav
          defaultExpandedItems={defaultExpandedItems}
          defaultSelectedItems={defaultSelectedItems}
        />
      </Stack>
    </Drawer>
  );
};

export default MainSideMenu;
