import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { koreanDate } from '../../../shared/utils/shared.util';

export const inpectionColumns: GridColDef[] = [
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
    field: 'area_type',
    headerName: '출고지역',
    type: 'string',
    flex: 1,
    resizable: true,
  },
  {
    field: 'country',
    headerName: '출고국가',
    type: 'string',
    flex: 1,
    resizable: true,
  },
  {
    field: 'company_name',
    headerName: '출고업체',
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
    renderCell: (params: GridRenderCellParams) =>
      params.value ? koreanDate(new Date(params.value)) : '',
  },
  {
    field: 'transaction_quantity',
    headerName: '거래수량',
    type: 'string',
    flex: 5,
    resizable: true,
  },
];

export const countryColumns: GridColDef[] = [
  {
    field: 'country',
    headerName: '국가명',
    type: 'string',
    flex: 1,
    resizable: true,
  },
  {
    field: 'company_name',
    headerName: '업체명',
    type: 'string',
    flex: 1.5,
    resizable: true,
  },
  {
    field: 'total',
    headerName: '총 거래수량',
    type: 'number',
    flex: 1,
    resizable: true,
  },
  {
    field: 'inspections',
    headerName: '출고검사',
    type: 'number',
    flex: 1,
    resizable: true,
    // renderCell: (params: GridRenderCellParams) =>
    //   params.value ? params.value?.length : null,
  },
  {
    field: 'shipping_date',
    headerName: '출고일자',
    type: 'string',
    flex: 6,
    resizable: true,
    renderCell: (params: GridRenderCellParams) =>
      params.value ? koreanDate(new Date(params.value)) : '',
  },
];

export const productscolumns: GridColDef[] = [
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
    renderCell: (params: GridRenderCellParams) =>
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
    renderCell: (params: GridRenderCellParams) =>
      params.value ? koreanDate(new Date(params.value)) : '',
  },
];

export const inspectionDetailscolumns: GridColDef[] = [
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
    renderCell: (params: GridRenderCellParams) =>
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
    renderCell: (params: GridRenderCellParams) =>
      params.value ? koreanDate(new Date(params.value)) : '',
  },
];

export const shippingDetailscolumns: GridColDef[] = [
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
    renderCell: (params: GridRenderCellParams) => params.value.company_name,
  },
  {
    field: 'shipping_date',
    headerName: '출고일자',
    type: 'string',
    flex: 1,
    resizable: true,
    renderCell: (params: GridRenderCellParams) =>
      params.value ? koreanDate(new Date(params.value)) : '',
  },
  {
    field: 'remarks',
    headerName: '비고',
    type: 'string',
    flex: 1,
    resizable: true,
  },
];
