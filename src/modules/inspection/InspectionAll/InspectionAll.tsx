import React from 'react';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMutation } from 'react-query';
import { useFetch } from '../../../shared/hooks/use-fetch.hook';
import { useHttp } from '../../../shared/hooks/use-http.hook';
import { Box, Button } from '@mui/material';
import useShared from '../../../shared/hooks/use-shared.hook';

const InspectionAll: React.FC = () => {
  const { koreanDate } = useShared();
  const { handleRetry } = useFetch();
  const { inspectionsGet } = useHttp();

  const [viewType, setViewType] = React.useState<'inspections' | 'products'>(
    'inspections'
  );

  const {
    mutate,
    data: data,
    isLoading,
  } = useMutation(() => inspectionsGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
  });

  React.useEffect(() => {
    mutate();
  }, []);

  const columns: GridColDef[] = React.useMemo(
    () => [
      {
        field: 'business_registration_number',
        headerName: '사업자등록번호',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'document_number',
        headerName: '문서번호',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'model_number',
        headerName: '제품명',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'company_name',
        headerName: '출고지',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'shipping_date',
        headerName: '출고일자',
        type: 'string',
        flex: 1,
        resizable: true,
        renderCell: (params) =>
          params.value ? koreanDate(new Date(params.value)) : '',
      },
      {
        field: 'transaction_quantity',
        headerName: '거래수량',
        type: 'string',
        flex: 5,
        resizable: true,
      },
    ],
    []
  );
  const productscolumns: GridColDef[] = React.useMemo(
    () => [
      {
        field: 'business_id',
        headerName: '사업자등록번호',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'document',
        headerName: '문서번호',
        type: 'string',
        flex: 1.5,
        resizable: true,
      },

      {
        field: 'model_id',
        headerName: '제품명',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'device_udi',
        headerName: 'UDI 바코드',
        type: 'string',
        flex: 2.5,
        resizable: true,
      },
      {
        field: 'device_lot',
        headerName: 'LOT 번호',
        type: 'string',
        flex: 0.8,
        resizable: true,
      },
      {
        field: 'device_serial',
        headerName: 'SERIAL 번호',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'manufacture_date',
        headerName: '제조일자',
        type: 'string',
        flex: 1,
        resizable: true,
        renderCell: (params) =>
          params.value ? koreanDate(new Date(params.value)) : '',
      },
      {
        field: 'company_id',
        headerName: '출고지',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'shipping_date',
        headerName: '출고일자',
        type: 'string',
        flex: 1,
        resizable: true,
        renderCell: (params) =>
          params.value ? koreanDate(new Date(params.value)) : '',
      },
    ],
    []
  );

  return (
    <Grid
      container
      spacing={2}
      className="flex flex-col p-5 w-full h-[calc(100vh-60px)]"
    >
      <Grid container spacing={2} className="flex flex-row">
        <Button
          className="border border-solid"
          sx={{ borderColor: 'divider' }}
          variant="contained"
          onClick={() => setViewType('inspections')}
        >
          모아보기
        </Button>
        <Button
          className="border border-solid"
          sx={{ borderColor: 'divider' }}
          variant="contained"
          onClick={() => setViewType('products')}
        >
          펼쳐보기
        </Button>
      </Grid>

      <DataGrid
        editMode="row"
        rows={viewType === 'inspections' ? data?.inspections : data?.products}
        columns={viewType === 'inspections' ? columns : productscolumns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 50 } },
        }}
        pageSizeOptions={[20, 50, 100]}
        density="compact"
        loading={isLoading}
        // slotProps={{
        //   filterPanel: {
        //     filterFormProps: {
        //       logicOperatorInputProps: {
        //         variant: 'outlined',
        //         size: 'small',
        //       },
        //       columnInputProps: {
        //         variant: 'outlined',
        //         size: 'small',
        //         sx: { mt: 'auto' },
        //       },
        //       operatorInputProps: {
        //         variant: 'outlined',
        //         size: 'small',
        //         sx: { mt: 'auto' },
        //       },
        //       valueInputProps: {
        //         InputComponentProps: {
        //           variant: 'outlined',
        //           size: 'small',
        //         },
        //       },
        //     },
        //   },
        // }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Grid>
  );
};

export default InspectionAll;
