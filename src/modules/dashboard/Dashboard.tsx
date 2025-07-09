import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Copyright from './internals/components/Copyright';

import dashboard_img from '../../assets/picture/dashboard.png';

export const Dashboard = React.memo(() => {
  return (
    <Box sx={{ width: '100%' }} className="flex flex-col p-5 h-full">
      <Typography component="h2" variant="h6">
        Overview
      </Typography>
      <Box className="flex grow mt-5">
        <img
          src={dashboard_img}
          alt="dashboard_img"
          className="w-11/12 h-auto"
          style={{
            objectFit: 'contain',
            transition: 'opacity 0.3s',
          }}
        />
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
});
