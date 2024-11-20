import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Box, Button, Grid2, Tab } from '@mui/material';

import clsx from 'clsx';
import styles from '../Layout/Layout.module.scss'; // Share scss files
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Icon } from '../../../ui/Icon/Icon';
import { LayoutProps, PageType } from '../Layout';
import { Header } from '../../Header/Header';

type DesktopViewProps = {
  pageType: PageType;
  leftComponent?: ReactNode;
  rightComponent: ReactNode;
};

export const DesktopView = ({
  pageType,
  leftComponent,
  rightComponent,
}: DesktopViewProps) => {
  const [showNav, setShowNav] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    switch (pageType) {
      case PageType.Dashboard:
        setShowNav(false);
        break;
      default:
        setShowNav(true);
        break;
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {showNav && (
        <>
          {/* Left Component (Width fixed) */}
          {sidebarOpen && (
            <Box
              className={clsx(
                styles['page-layout-grid-left'],
                'w-dashboard-nav-width' // fixed width in tailwind.config
              )}
            >
              {leftComponent}
            </Box>
          )}
          {/* Toggle Button */}
          <Button
            onClick={toggleSidebar}
            className={styles['toggle-button']}
            color="inherit"
            sx={{
              color: 'white',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'text.primary',
              },
            }}
            style={{
              left: sidebarOpen ? `${360 - 24 / 2}px` : '0', // $dashboard-nav-width - width(w-6) / 2
            }}
          >
            {sidebarOpen ? (
              <Icon
                color="inherit"
                icon={['fas', 'chevron-left']}
                size="inherit"
              />
            ) : (
              <Icon
                color="inherit"
                icon={['fas', 'chevron-right']}
                size="inherit"
              />
            )}
          </Button>
        </>
      )}
      {/* Right Component*/}
      <Box className={styles['page-layout-grid-right']}>{rightComponent}</Box>
    </>
  );
};

const DashboardTitle = () => {
  return (
    <Box
      className="font-semibold flex flex-row s-center w-64 px-4"
      sx={{ color: 'text.primary' }}
    >
      <Icon icon={['far', 'grid-2']} classes="mr-2" />
      Dashboard
    </Box>
  );
};
