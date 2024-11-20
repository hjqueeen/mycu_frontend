import { Grid2 } from '@mui/material';
import styles from '../Layout/Layout.module.scss'; // Share scss files
// import SwipeableViews from 'react-swipeable-views';
import { ReactNode } from 'react';

export type MobileViewProps = {
  leftComponent: ReactNode;
  rightComponent1: ReactNode;
  rightComponent2: ReactNode;
  rightComponent3: ReactNode;
};

export const MobileView = ({
  leftComponent,
  rightComponent1,
}: // rightComponent2,
// rightComponent3,
MobileViewProps) => {
  return (
    <div>MobileView</div>
    // <Grid2 item xs={12} className={styles['page-layout-grid-mobile']}>
    //   <SwipeableViews enableMouseEvents style={{ height: '100%' }} index={1}>
    //     <Grid2 item xs className={styles['page-layout-grid-left']}>
    //       {leftComponent}
    //     </Grid2>
    //     <Grid2 item xs className={styles['page-layout-grid-right']}>
    //       {rightComponent1}
    //     </Grid2>
    //     <Grid2 item xs className={styles['page-layout-grid-right']}>
    //       {rightComponent2}
    //     </Grid2>
    //     <Grid2 item xs className={styles['page-layout-grid-right']}>
    //       {rightComponent3}
    //     </Grid2>
    //   </SwipeableViews>
    // </Grid2>
  );
};
