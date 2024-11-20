import React, { memo, useState } from 'react';
import { useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Box, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// Styles
import styles from './Header.module.scss';
import useResponsive from '../../hooks/use-responsive ';
import { IconButton } from '../../ui/IconButton/IconButton';
import { SharedState, useSharedStore } from '../../store/use-shared.store';

type HeaderProps = {};

export const Header = memo(() => {
  return (
    <React.Fragment>
      <Box
        bgcolor="bg.newheader"
        borderColor="border.header"
        className={styles['header']}
      >
        Header
      </Box>
      <div className={styles['hedaer-background']}></div>
    </React.Fragment>
  );
});

const Breadcrumbs = memo(() => {
  return <div className={styles['header-container-logo-breadcrumbs']}></div>;
});

const AccountSetting = memo(({}) => {
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();

  const [account, setAccount] = useState<any>({ firstName: 'Guest' });
  const [drawer, setDrawer] = useState(false);
  // Shared store state
  const [
    breadcrumbs,
    network,
    dashboard,
    newsCenter,
    workbench,
    userRouter,
    market,
  ] = useSharedStore((state: SharedState) => [
    state.breadcrumbs,
    state.network,
    state.dashboard,
    state.newsCenter,
    state.workbench,
    state.userRouter,
    state.market,
  ]);

  return (
    <Box
      color="inherit"
      onClick={() => setDrawer(true)}
      // sx={{
      //   '&:hover div': {
      //     '& svg': { color: 'white' },
      //     bgcolor: 'bg.card',
      //   },
      // }}
      className={styles['header-container-navbar-drawer']}
    >
      {isDesktop && account.first_name && (
        <Box className={styles['header-container-navbar-drawer-name']}>
          {account.personal_data.first_name}
        </Box>
      )}

      <IconButton
        onClick={() => {}}
        classes={clsx(
          styles['header-container-navbar-buttons-iconbutton'],
          styles['setting-icon']
        )}
        sxButton={{
          '& svg': {
            color: 'text.secondary',
          },
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: 'transparent',
          },
        }}
        iconSize="small"
        icon={['fal', 'gear']}
      />
    </Box>
  );
});
