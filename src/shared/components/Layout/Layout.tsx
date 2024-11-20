import { ReactNode } from 'react';
import { Box, Grid2 } from '@mui/material';
import styles from './Layout.module.scss';
import { Header } from '../Header/Header';
import useResponsive from '../../hooks/use-responsive ';
import { MobileView } from './MobileView/MobileView';
import { DesktopView } from './DesktopView/DesktopView';

export enum PageType {
  Dashboard = 'DASHBOARD', // 메인페이지
  Products = 'PRODUCTS', // 상품관리
  Inventory = 'INVENTORY', // 재고관리
  Shipping = 'SHIPPING', // 출고관리
  UserManagement = 'USER_MANAGEMENT', //유저관리
}

export type LayoutProps = {
  pageType: PageType;
  leftComponent?: ReactNode;
  rightComponent: ReactNode;
  rightComponentName: string;
};

export const Layout = ({
  pageType,
  leftComponent,
  rightComponent,
  rightComponentName: rightComponentName1,
}: LayoutProps) => {
  const { isMobile, isDesktop } = useResponsive();
  console.log('AppRouter', pageType);

  return (
    <Box>
      <Header />
      <Box className={styles['page-layout-grid']}>
        {/* {isMobile && (
            <MobileView
              leftComponent={leftComponent}
              rightComponent1={rightComponent1}
              // rightComponent2={rightComponent2}
              // rightComponent3={rightComponent3}
            />
          )} */}
        {/* {isDesktop && (
            <DesktopView
              pageType={pageType}
              leftComponent={leftComponent}
              rightComponent={rightComponent}
            />
          )} */}
        <DesktopView
          pageType={pageType}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        />
      </Box>
    </Box>
  );
};
