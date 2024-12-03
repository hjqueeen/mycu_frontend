import { Box, Button, FormLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import BarcodeScanner from '../BarcodeScanner';
import Typography from '@mui/material/Typography/Typography';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ShippingInformation from './ShippingInformation';
import ProductScanner from './ProductScanner';
import { thinScroll } from '../../../shared/models/shared.types';

export interface Barcode {
  device: string;
  battery: string;
  pads: string;
}

export const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: '8px',
}));

export const FormLabelStyled = styled(FormLabel)(() => ({
  minWidth: '120px',
  width: '120px',
  marginRight: '6px',
}));

export const OutlinedInputStyled = styled(OutlinedInput)(() => ({
  width: '100%',
  maxWidth: '300px',
}));

const columns: GridColDef[] = [
  {
    field: 'device_udi',
    headerName: '제품 UDI 바코드',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'device_lot',
    headerName: 'LOT 번호',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'device_serial',
    headerName: 'SERIAL 번호',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'battery_udi',
    headerName: '배터리 UDI 바코드',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'battery_serial',
    headerName: '배터리 SERIAL 번호',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'pads_udi',
    headerName: '패즈 UDI 바코드',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'pads_lot',
    headerName: '패즈 LOT 번호',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'pads_expiration_date',
    headerName: '패즈 유효기간',
    type: 'string',
    width: 180,
    editable: false,
  },
];
export const ProductAdd: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  return (
    <Grid
      container
      spacing={2}
      className="flex flex-col py-10 overflow-y-hidden"
      sx={{ height: '100%' }}
    >
      <ShippingInformation />
      <ProductScanner rows={rows} setRows={setRows} />
      <Grid className="w-full h-[calc(100vh-520px)]">
        <DataGrid
          editMode="row"
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          density="compact"
          slotProps={{
            filterPanel: {
              filterFormProps: {
                logicOperatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                },
                columnInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                operatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                valueInputProps: {
                  InputComponentProps: {
                    variant: 'outlined',
                    size: 'small',
                  },
                },
              },
            },
          }}
        />
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{
          alignSelf: 'end',
          width: { xs: '300px', sm: 'auto' },
        }}
      >
        입력완료
      </Button>
    </Grid>
  );
};
