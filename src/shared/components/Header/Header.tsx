import React, { memo, useState } from 'react';
import { useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Box, Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Header.module.scss';
import useResponsive from '../../hooks/use-responsive ';
import { SharedState, useSharedStore } from '../../store/use-shared.store';
import { Tooltip } from '../../ui/Tooltip/Tooltip';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { PageType } from '../Layout/Layout';
import cuLogo from '../../../assets/logo/cropped-CU-LOGO-ohne-Titel.png';
import cuBackgroud from '../../../assets/picture/cusp12.jpg';

type HeaderProps = {
  pageType: PageType;
};

export const Header = memo(({ pageType }: HeaderProps) => {
  return (
    <React.Fragment>
      <Box
        bgcolor="bg.newheader"
        borderColor="border.header"
        className={styles['header']}
      >
        <Box className={styles['header-container']}>
          <Box className={styles['header-container-logo']}>
            <img src={cuLogo} alt="cu-logo" />
          </Box>

          <Box className="flex flex-row">
            <HeaderIcon
              path="/dashboard"
              activ={pageType === PageType.Dashboard}
              icon={['fal', 'objects-column']}
            />
            <HeaderIcon
              path="/products"
              activ={pageType === PageType.Products}
              icon={['fal', 'chart-network']}
            />
            <HeaderIcon
              path="/inventory"
              activ={pageType === PageType.Inventory}
              icon={['fal', 'chart-network']}
            />
            <HeaderIcon
              path="/shipping"
              activ={pageType === PageType.Shipping}
              icon={['fal', 'chart-network']}
            />
            <HeaderIcon
              path="/user_management"
              activ={pageType === PageType.UserManagement}
              icon={['fal', 'users']}
            />
          </Box>
        </Box>
      </Box>
      <div className={styles['hedaer-background']}>
        {/* <img src={cuBackgroud} alt="header-background" /> */}
      </div>
    </React.Fragment>
  );
});

const HeaderIcon = ({
  activ,
  path,
  icon,
}: {
  activ: boolean;
  path: string;
  icon: [IconPrefix, IconName];
}) => {
  return (
    <Link to={path}>
      <Tooltip title="shipping">
        <Box
          className="mr-4 py-5 px-4"
          sx={{
            color: 'text.primary',
            fontWeight: activ ? 600 : undefined,
            '&:hover': {
              fontWeight: 600,
              bgcolor: 'bg.hover',
            },
          }}
        >
          {path.slice(1).toUpperCase()}
        </Box>
      </Tooltip>
    </Link>
  );
};
