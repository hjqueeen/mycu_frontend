import { ReactNode } from 'react';
import { alpha, Box, Stack, Typography } from '@mui/material';

import { Header } from '../Header/Header';
import ContentHeader from './ContentHeader';
import { ProductsPageType } from '../../models/all.types';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import avatar from '../../../assets/picture/avatar.jpg';
import OptionsMenu from '../../../modules/products/OptionsMenu';

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
}

export type LayoutProps = {
  pageType: PageType;
  contentType?: ProductsPageType;
  appNavbar?: ReactNode;
  navContent?: ReactNode;
  mainGrid: ReactNode;
  rightComponentName: string;
};

export const Layout = ({
  pageType,
  contentType,
  appNavbar,
  navContent,
  mainGrid,
  rightComponentName,
}: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header pageType={pageType} />
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
            {navContent}
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
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src={avatar}
              sx={{ width: 36, height: 36 }}
            />
            <Box sx={{ mr: 'auto' }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: '16px' }}
              >
                Pyunggang Park
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                ppg6530@email.com
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
              alignItems: 'center',
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
