import { ReactNode } from 'react';
import { alpha, Box, Stack } from '@mui/material';

import { Header } from '../Header/Header';
import MainHeader from './MainHeader';
import { ProductsPageType } from '../../models/all.types';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

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
  sideMenu?: ReactNode;
  mainGrid: ReactNode;
  rightComponentName: string;
};

export const Layout = ({
  pageType,
  contentType,
  appNavbar,
  sideMenu,
  mainGrid,
  rightComponentName: rightComponentName1,
}: LayoutProps) => {
  return (
    <Box className="h-full flex-col" sx={{ display: 'flex' }}>
      <Header pageType={pageType} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {sideMenu}
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
            <MainHeader pageType={pageType} contentType={contentType} />
            {mainGrid}
          </Stack>
        </Box>
      </Box>
    </Box>

    // <Box className="h-full">
    //   <Header pageType={pageType} />
    //   <Box className={styles['page-layout-grid']}>
    //     {/* {isMobile && (
    //       <MobileView
    //         leftComponent={leftComponent}
    //         rightComponent1={rightComponent1}
    //         // rightComponent2={rightComponent2}
    //         // rightComponent3={rightComponent3}
    //       />
    //     )} */}
    //     {/* {isDesktop && (
    //       <DesktopView
    //         pageType={pageType}
    //         leftComponent={leftComponent}
    //         rightComponent={rightComponent}
    //       />
    //     )} */}
    //     <DesktopView
    //       pageType={pageType}
    //       leftComponent={leftComponent}
    //       rightComponent={rightComponent}
    //     />
    //   </Box>
    // </Box>
  );
};

// 네비게이션 메뉴
const Navigation = () => {
  return <></>;
};

// 메인 레이아웃
export const MainLayout = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">웹 애플리케이션 헤더</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item xs={3}>
          <Navigation />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h4">콘텐츠 영역</Typography>
          {/* 여기에 오른쪽 콘텐츠를 추가할 수 있습니다. 예를 들어: */}
          <Typography variant="body1">
            이곳에 상세 내용이 표시됩니다.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
