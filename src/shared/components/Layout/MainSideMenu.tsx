import { Box, Stack, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import DashboardNav from '../../../modules/dashboard/components/DashboardNav';
import { useUserStore } from '../../store/use-user.store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import OptionsMenu from '../../../modules/inspection/ProductAdd/OptionsMenu';
import { fullNameGet } from '../../utils/shared.util';
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
  const { account } = useUserStore();

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
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* <Avatar
              sizes="small"
              alt="Riley Carter"
              src={avatar}
              sx={{ width: 36, height: 36 }}
            /> */}
        <FontAwesomeIcon
          icon={faUser}
          style={{ width: 30, height: 30, color: '#999999' }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: '16px' }}
          >
            {fullNameGet(account)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {account?.email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
};

export default MainSideMenu;
