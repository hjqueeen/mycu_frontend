import { Grid2 as Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React from 'react';

const ShippingEdit = () => {
  const [value, setValue] = React.useState<any>('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <Box>
      <Grid container spacing={1} className="flex flex-row">
        <Typography>출고내역 검색</Typography>
        <OutlinedInput value={value} onChange={handleChange} />
      </Grid>
    </Box>
  );
};

export default ShippingEdit;
