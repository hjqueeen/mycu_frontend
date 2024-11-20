import { ReactNode, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import clsx from 'clsx';
import styles from '../Layout.module.scss'; // Share scss files
import { PageType } from '../Layout';
import { Icon } from '../../../ui/Icon/Icon';

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
      Dashboard
    </Box>
  );
};
