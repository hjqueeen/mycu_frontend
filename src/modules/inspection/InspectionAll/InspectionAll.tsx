import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMutation } from 'react-query';
import { useFetch } from '../../../shared/hooks/use-fetch.hook';
import { useHttp } from '../../../shared/hooks/use-http.hook';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  OutlinedInput,
} from '@mui/material';
import useShared from '../../../shared/hooks/use-shared.hook';
import { DataGridPro } from '@mui/x-data-grid-pro';
import {
  FormGrid,
  FormLabelStyled,
  ShippingInfo,
} from '../InspectionAdd/InspectionAdd';

const GridStyled = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const OutlinedInputStyled = styled(OutlinedInput)(() => ({
  width: '100%',
  maxWidth: '400px',
}));

const InspectionAll: React.FC = () => {
  const { koreanDate } = useShared();
  const { handleRetry } = useFetch();
  const { inspectionsGet, inspectionsDetailsGet, productDetailsGet } =
    useHttp();

  const [viewType, setViewType] = React.useState<'inspections' | 'products'>(
    'inspections'
  );
  const [rows, setRows] = React.useState<{
    inspections: any[];
    products: any[];
  }>({
    inspections: [],
    products: [],
  });

  const {
    mutate: inspectionsGetMutation,
    data: data,
    isLoading,
  } = useMutation(() => inspectionsGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    // onSuccess(data, variables, context) {
    //   if (data) {
    //     setRows(data);
    //   }
    // },
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [productDetailOpen, setProductDetailOpen] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState('');
  const [selectedDocument, setSelectedDocument] = React.useState('');

  const {
    mutate: inspectionsDetailsGetMutate,
    data: inspectionsData,
    isLoading: inspectionsDetailsGetLoading,
  } = useMutation(inspectionsDetailsGet, {
    onSettled(data) {
      if (data) {
        setDialogOpen(true);
      }
    },
  });

  const {
    mutate: productDetailsGetMutate,
    data: productData,
    isLoading: productDetailsGetLoading,
  } = useMutation(productDetailsGet, {
    onSettled(data) {
      if (data) {
        setProductDetailOpen(true);
      }
    },
  });

  React.useEffect(() => {
    inspectionsGetMutation();
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
  const inspectionDetailscolumns: GridColDef[] = React.useMemo(
    () => [
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

  const shippingDetailscolumns: GridColDef[] = React.useMemo(
    () => [
      {
        field: 'shipping_area',
        headerName: '출고지역',
        type: 'string',
        flex: 1,
        resizable: true,
      },
      {
        field: 'company',
        headerName: '출고지',
        type: 'string',
        flex: 1,
        resizable: true,
        renderCell: (params) => params.value.company_name,
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
        field: 'remarks',
        headerName: '비고',
        type: 'string',
        flex: 1,
        resizable: true,
      },
    ],
    []
  );

  // DataGrid 행 클릭 이벤트 핸들러
  const handleRowClick = (params: any) => {
    const rowId = params.id; // 선택된 행의 ID
    setSelectedRowId(rowId);
    if (viewType === 'inspections') {
      setSelectedDocument(params.row.document_number);
      inspectionsDetailsGetMutate(rowId); // 백엔드 요청 실행
    }
    if (viewType === 'products') {
      setSelectedDocument(params.row.model_id);
      productDetailsGetMutate(rowId);
    }
  };

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
      <DataGridPro
        editMode="row"
        rows={
          data
            ? viewType === 'inspections'
              ? data.inspections
              : data.products
            : []
        }
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
        onRowClick={handleRowClick} // 행 클릭 이벤트 핸들러
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
        sx={{
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
          },
        }}
      />
      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          출하내역 상세보기 (문서번호: ${selectedDocument})
        </DialogTitle>
        <DialogContent>
          {/* 두 번째 DataGrid */}
          <DataGridPro
            rows={
              inspectionsData && viewType === 'inspections'
                ? inspectionsData
                : []
            } // 받아온 데이터를 사용
            columns={
              viewType === 'inspections' ? inspectionDetailscolumns : columns
            }
            density="compact"
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            loading={
              viewType === 'inspections'
                ? inspectionsDetailsGetLoading
                : productDetailsGetLoading
            }
            style={{ height: 400, width: '100%' }}
          />
        </DialogContent>
      </Dialog>
      {/* Product Detail Dialog */}
      <Dialog
        open={productDetailOpen}
        onClose={() => setProductDetailOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle className="mb-4">
          상세보기 (제품: {selectedDocument})
        </DialogTitle>
        <DialogContent sx={{ bgColor: 'background.paper' }}>
          <Grid container spacing={1} className="w-full flex">
            <GridStyled size={6} className="flex flex-row">
              <FormLabelStyled>문서번호</FormLabelStyled>
              <OutlinedInputStyled
                id="document"
                name="document"
                type="text"
                size="small"
                value={productData?.document}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>제품번호</FormLabelStyled>
              <OutlinedInputStyled
                id="model_number"
                name="model_number"
                type="text"
                size="small"
                value={productData?.model_number}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>제품명</FormLabelStyled>
              <OutlinedInputStyled
                id="model_name"
                name="model_name"
                type="text"
                size="small"
                value={productData?.model_name}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>제조일자</FormLabelStyled>
              <OutlinedInputStyled
                id="manufacture_date"
                name="manufacture_date"
                type="date"
                size="small"
                value={productData?.manufacture_date}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>제품 UDI 바코드</FormLabelStyled>
              <OutlinedInputStyled
                id="device_udi"
                name="device_udi"
                type="text"
                size="small"
                value={productData?.device_udi}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>제품 LOT 번호</FormLabelStyled>
              <OutlinedInputStyled
                id="device_lot"
                name="device_lot"
                type="text"
                size="small"
                value={productData?.device_lot}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>제품 시리얼 번호</FormLabelStyled>
              <OutlinedInputStyled
                id="device_serial"
                name="device_serial"
                type="text"
                size="small"
                value={productData?.device_serial}
              />
            </GridStyled>
            <GridStyled size={6}></GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>배터리 UDI 바코드</FormLabelStyled>
              <OutlinedInputStyled
                id="battery_udi"
                name="battery_udi"
                type="text"
                size="small"
                value={productData?.battery_udi}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>배터리 유효기간</FormLabelStyled>
              <OutlinedInputStyled
                id="battery_expiration_date"
                name="battery_expiration_date"
                type="date"
                size="small"
                value={productData?.battery_expiration_date}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>패즈 UDI 바코드</FormLabelStyled>
              <OutlinedInputStyled
                id="pads_udi"
                name="pads_udi"
                type="date"
                size="small"
                value={productData?.pads_udi}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>패즈 LOT 번호</FormLabelStyled>
              <OutlinedInputStyled
                id="pads_lot"
                name="pads_lot"
                type="date"
                size="small"
                value={productData?.pads_lot}
              />
            </GridStyled>
            <GridStyled size={6}>
              <FormLabelStyled>패즈 유효기간</FormLabelStyled>
              <OutlinedInputStyled
                id="pads_expiration_date"
                name="pads_expiration_date"
                type="date"
                size="small"
                value={productData?.pads_expiration_date}
              />
            </GridStyled>
            <GridStyled size={6}></GridStyled>

            <Grid className="flex flex-col" size={12}>
              <FormLabelStyled>출고 이력</FormLabelStyled>
              <DataGridPro
                rows={productData?.shipping_history || []}
                columns={shippingDetailscolumns}
                density="compact"
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 20]}
                loading={productDetailsGetLoading}
                disableRowSelectionOnClick
                style={{ height: 400, width: '100%' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default InspectionAll;
