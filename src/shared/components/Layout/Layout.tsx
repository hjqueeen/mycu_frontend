import { ReactNode } from 'react';
import { alpha, Box, Grid2 as Grid, Stack } from '@mui/material';
import Header from '../Header/Header';
import { InspectionContentType } from '../../models/all.types';

import { useUserStore } from '../../store/use-user.store';

import MainSideMenu from './MainSideMenu';

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
  Alarm = 'ALARM',
}

export type LayoutProps = {
  pageType: PageType;
  contentType?: InspectionContentType;
  appNavbar?: ReactNode;
  mainGrid: ReactNode;
};

export const Layout = ({
  pageType,
  contentType,
  appNavbar, // for Mobile
  mainGrid,
}: LayoutProps) => {
  // User store state
  const { account, headerMenu } = useUserStore();
  // User store state

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minWidth: '1600px', // 스크롤바 생기는 시점
        overflowY: 'hidden',
        overflowX: 'auto',
      }}
    >
      <Header pageType={pageType} headerMenu={headerMenu} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <MainSideMenu contentType={contentType} pageType={pageType} />
        {appNavbar}
        {/* Main content */}
        <Box
          component="main"
          sx={(theme: any) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
          })}
        >
          <Stack
            className="fixed h-[calc(100vh-64px)] top-[64px] w-[calc(100vw-240px)] min-w-[1360px]"
            sx={{
              // alignItems: 'center',
              px: 3,
            }}
          >
            {mainGrid}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
