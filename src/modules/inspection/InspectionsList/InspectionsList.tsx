import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useMutation } from 'react-query';
import { useFetch } from '../../../shared/hooks/use-fetch.hook';
import { useHttp } from '../../../shared/hooks/use-http.hook';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  OutlinedInput,
  Typography,
  Box,
} from '@mui/material';
import { FormLabelStyled } from '../InspectionAdd/InspectionAdd';
import { InspectionViewType } from '../../../shared/models/all.types';
import {
  inspectionDetailscolumns,
  inpectionColumns,
  shippingDetailscolumns,
  productscolumns,
  countryColumns,
} from './DataGridColumns';
import CustomDataGrid from '../../../shared/components/CustomDataGrid';

const GridStyled = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const OutlinedInputStyled = styled(OutlinedInput)(() => ({
  width: '100%',
  maxWidth: '400px',
}));

const InspectionsList = ({ pageType }: { pageType: InspectionViewType }) => {
  const { handleRetry } = useFetch();
  const {
    inspectionsGet,
    inspectionsCountryGet,
    inspectionsProductsGet,
    inspectionsDetailsGet,
    productDetailsGet,
  } = useHttp();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [productDetailOpen, setProductDetailOpen] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = React.useState('');
  const [productDetailTitle, setProductDetailTitle] = useState('');

  /********************/
  /*     Mutation     */
  /********************/

  const {
    mutate: inspectionsGetMutate,
    data: inspectionsStandardData,
    isLoading,
  } = useMutation(() => inspectionsGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
  });

  const {
    mutate: inspectionsCountryGetMutate,
    data: inspectionsCountryData,
    isLoading: inspectionsCountryLoading,
  } = useMutation(() => inspectionsCountryGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
  });

  const {
    mutate: inspectionsProductsGetMutate,
    data: inspectionsProductDdata,
    isLoading: inspectionsProductLoading,
  } = useMutation(() => inspectionsProductsGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
  });

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

  /********************/
  /*      EFFECT      */
  /********************/

  React.useEffect(() => {
    switch (pageType) {
      case InspectionViewType.Country:
        inspectionsCountryGetMutate();
        break;
      case InspectionViewType.Inspections:
        inspectionsGetMutate();
        break;
      case InspectionViewType.Products:
        inspectionsProductsGetMutate();
        break;
      default:
        break;
    }
  }, [pageType]);

  /********************/
  /*     CALLBACK     */
  /********************/

  // DataGrid 행 클릭 이벤트 핸들러
  const handleRowClick = (params: any) => {
    const rowId = params.id; // 선택된 행의 ID
    if (pageType === InspectionViewType.Inspections && !dialogOpen) {
      setSelectedDocument(params.row.document_number);
      inspectionsDetailsGetMutate(rowId); // 백엔드 요청 실행
    }
    if (pageType === InspectionViewType.Inspections && dialogOpen) {
      setProductDetailTitle(params.row.model_name);
      productDetailsGetMutate(rowId); // 백엔드 요청 실행
    }
    if (pageType === InspectionViewType.Products) {
      productDetailsGetMutate(rowId);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      className="flex flex-col p-5 w-full h-[calc(100vh-60px)]"
    >
      <Grid container spacing={2} className="flex flex-row items-center">
        <Grid container spacing={1} className="flex flex-row items-center">
          <Typography variant="h6">검색기간설정: </Typography>
          <Typography>시작</Typography>
          <OutlinedInput
            id="start_date"
            name="start_date"
            type="date"
            value="2024-01-01"
            disabled
          />
          <Typography>끝</Typography>
          <OutlinedInput
            id="end_date"
            name="end_date"
            type="date"
            value="2024-01-31"
            disabled
          />
          <Box />
        </Grid>
        <Box className="grow" />

        {/* <Button
          className="border border-solid"
          sx={{ borderColor: 'divider' }}
          variant="contained"
          onClick={() => setViewType(InspectionViewType.Country)}
        >
          국가별보기
        </Button>
        <Button
          className="border border-solid"
          sx={{ borderColor: 'divider' }}
          variant="contained"
          onClick={() => setViewType(InspectionViewType.Inspections)}
        >
          출고별보기
        </Button>
        <Button
          className="border border-solid"
          sx={{ borderColor: 'divider' }}
          variant="contained"
          onClick={() => setViewType(InspectionViewType.Products)}
        >
          모두보기
        </Button> */}
      </Grid>
      <CustomDataGrid
        rows={
          pageType === InspectionViewType.Country
            ? inspectionsCountryData || []
            : pageType === InspectionViewType.Inspections
            ? inspectionsStandardData || []
            : pageType === InspectionViewType.Products
            ? inspectionsProductDdata || []
            : []
        }
        columns={
          pageType === InspectionViewType.Country
            ? countryColumns
            : pageType === InspectionViewType.Inspections
            ? inpectionColumns
            : productscolumns
        }
        loading={
          isLoading || inspectionsCountryLoading || inspectionsProductLoading
        }
        onRowClick={handleRowClick} // 행 클릭 이벤트 핸들러
      />
      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xl"
        fullWidth
        className="mt-20 ml-48"
      >
        <DialogTitle>
          출하내역 상세보기 (문서번호: {selectedDocument})
        </DialogTitle>
        <DialogContent>
          {/* 두 번째 DataGrid */}
          <CustomDataGrid
            rows={
              inspectionsData && pageType === InspectionViewType.Inspections
                ? inspectionsData
                : []
            }
            columns={
              pageType === InspectionViewType.Inspections
                ? inspectionDetailscolumns
                : inpectionColumns
            }
            pageSize={10}
            onRowClick={handleRowClick}
            pageSizeOptions={[10, 20, 50, 100]}
            loading={
              pageType === InspectionViewType.Inspections
                ? inspectionsDetailsGetLoading
                : productDetailsGetLoading
            }
            style={{ height: '500px' }}
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
          상세보기 (제품: {productData?.model_number})
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
              <CustomDataGrid
                rows={productData?.shipping_history || []}
                columns={shippingDetailscolumns}
                pageSize={5}
                pageSizeOptions={[5, 10, 20]}
                loading={productDetailsGetLoading}
                disableRowSelectionOnClick
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default InspectionsList;
