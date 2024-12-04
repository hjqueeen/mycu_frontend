import React from 'react';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
    width: 100,
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
    field: 'battery_expiration_date',
    headerName: '배터리 유효기간',
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

const ProductDataGrid = ({ rows }: { rows: any[] }) => {
  return (
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
  );
};

export default React.memo(ProductDataGrid);
