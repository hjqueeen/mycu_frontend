import { ReactNode } from 'react';
import { alpha, Box, Stack, Typography } from '@mui/material';

import { Header } from '../Header/Header';
import ContentHeader from './ContentHeader';
import { InspectionContentType } from '../../models/all.types';

import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import OptionsMenu from '../../../modules/inspection/OptionsMenu';
import DashboardNav from '../../../modules/dashboard/components/DashboardNav';
import { useUserStore } from '../../store/use-user.store';
import { useAuthStore } from '../../store/use-auth.store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import useShared from '../../hooks/use-shared.hook';

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

export enum PageType {
  Dashboard = 'DASHBOARD', // 메인페이지
  Products = 'PRODUCTS', // 상품관리
  Inventory = 'INVENTORY', // 재고관리
  Shipping = 'SHIPPING', // 출고관리
  UserManagement = 'USER_MANAGEMENT', //유저관리
  Cart = 'CART',
  Checkout = 'CHECKOUT',
  Account = 'ACCOUNT',
  Password = 'PASSWORD',
}

export type LayoutProps = {
  pageType: PageType;
  contentType?: InspectionContentType;
  appNavbar?: ReactNode;
  navContent?: ReactNode;
  mainGrid: ReactNode;
};

export const Layout = ({
  pageType,
  contentType,
  appNavbar,
  navContent,
  mainGrid,
}: LayoutProps) => {
  // User store state
  const { account, headerMenu } = useUserStore();
  const { accessToken } = useAuthStore();
  const { fullNameGet } = useShared();
  // User store state

  let defaultExpandedItems;
  let defaultSelectedItems;
  if (pageType === PageType.Dashboard) {
    defaultExpandedItems = undefined;
    defaultSelectedItems = undefined;
  } else if (pageType === PageType.Products) {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minWidth: '1700px',
        overflowY: 'hidden',
        overflowX: 'auto',
      }}
    >
      <Header pageType={pageType} headerMenu={headerMenu} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
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

        {appNavbar}
        {/* Main content */}
        <Box
          component="main"
          sx={(theme: any) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              height: '100%',
              // alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <ContentHeader pageType={pageType} contentType={contentType} />
            {mainGrid}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
