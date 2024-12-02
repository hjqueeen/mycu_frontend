import { Box, Button, Divider, FormLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import BarcodeScanner from '../BarcodeScanner';
import Typography from '@mui/material/Typography/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useMutation } from 'react-query';
import { ICategory, ICompany } from '../../../shared/models/all.types';
import { useHttp } from '../../../shared/hooks/use-http.hook';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface Barcode {
  udi: string;
  lot: string;
  serial: string;
  manufacture_date?: string;
  expiration_date?: string;
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

const businessIds = ['224-81-2409-81', '224-81-24096'];

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90 },
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
    field: 'battery_lot',
    headerName: '배터리 LOT 번호',
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
    field: 'battery_manufacture_date',
    headerName: '배터리 생산일자',
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
    field: 'pads_serial',
    headerName: '패즈 SERIAL 번호',
    type: 'string',
    width: 180,
    editable: false,
  },
  {
    field: 'pads_manufacture_date',
    headerName: '패즈 생산일자',
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
  const { categoriesGet, companiesGet } = useHttp();

  // State
  const [formValues, setFormValues] = useState(() => {
    const today = new Date(); // 오늘 날짜를 기본값으로 설정
    return {
      document: '',
      inspector: '',
      model_id: '',
      company_id: '',
      business_id: '',
      quantity: '',
      manufacture_date: '',
      inspection_date: today.toISOString().split('T')[0], // "YYYY-MM-DD" 형식
    };
  });
  const [rows, setRows] = useState<any[]>([]);

  const [barcode, setBarcode] = useState('');
  const [aedBarcode, setAedBarcode] = useState<Barcode>({
    udi: '',
    lot: '',
    serial: '',
  });
  const [batteryBarcode, setBatteryBarcode] = useState<Barcode>({
    udi: '',
    lot: '',
    serial: '',
    manufacture_date: '',
    expiration_date: '',
  });
  const [padsBarcode, setPadsBarcode] = useState<Barcode>({
    udi: '',
    lot: '',
    serial: '',
    manufacture_date: '',
    expiration_date: '',
  });

  let scanBuffer = '';

  const { mutate: categoriesGetMutation, data: models } = useMutation(() =>
    categoriesGet()
  );

  const { mutate: companiesGetMutation, data: companies } = useMutation(() =>
    companiesGet()
  );

  useEffect(() => {
    categoriesGetMutation();
    companiesGetMutation();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Enter 키를 기준으로 바코드 데이터 구분
      if (event.key === 'Enter') {
        setBarcode(scanBuffer);
        scanBuffer = ''; // 버퍼 초기화
        console.log('Scanned barcode:', barcode);
        // 상품 검색 또는 입력 처리 로직 추가
      } else {
        scanBuffer += event.key;
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [barcode]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value as string;
    setFormValues((prev) => ({
      ...prev,
      ['inspection_date']: selectedDate,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent, name: string) => {
    const selectedValue = event.target.value as string;
    setFormValues((prev) => ({
      ...prev,
      [name]: selectedValue, // 필드 이름에 따라 상태 업데이트
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name as string]: value, // 필드 이름에 따라 상태 업데이트
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('formValues', formValues);
  };

  const addProductToRow = () => {
    const newRow = {
      id: aedBarcode.udi,
      device_udi: aedBarcode.udi,
      device_lot: aedBarcode.lot,
      device_serial: aedBarcode.serial,
      battery_udi: batteryBarcode.udi,
      battery_lot: batteryBarcode.lot,
      battery_serial: batteryBarcode.serial,
      battery_manufacture_date: batteryBarcode.manufacture_date,
      battery_expiration_date: batteryBarcode.expiration_date,
      pads_udi: padsBarcode.udi,
      pads_lot: padsBarcode.lot,
      pads_serial: padsBarcode.serial,
      pads_manufacture_date: padsBarcode.manufacture_date,
      pads_expiration_date: padsBarcode.expiration_date,
    };
    setRows([...rows, newRow]);
    setAedBarcode({
      udi: '',
      lot: '',
      serial: '',
    });
    setBatteryBarcode({
      udi: '',
      lot: '',
      serial: '',
      manufacture_date: '',
      expiration_date: '',
    });
    setPadsBarcode({
      udi: '',
      lot: '',
      serial: '',
      manufacture_date: '',
      expiration_date: '',
    });
  };

  return (
    <Grid
      container
      spacing={2}
      className="flex flex-col py-10"
      sx={{ height: '100%' }}
    >
      <Grid spacing={1} container className="w-full">
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>사업자등록번호</FormLabelStyled>
          <Select
            id="business_id"
            name="business_id"
            value={formValues.business_id}
            onChange={(e) => handleSelectChange(e, 'business_id')}
            displayEmpty
            size="small"
            sx={{ width: '100%', maxWidth: '300px' }}
          >
            <MenuItem value="" disabled>
              <Typography>선택</Typography>
            </MenuItem>
            {businessIds?.map((id: string) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>문서번호</FormLabelStyled>
          <OutlinedInputStyled
            id="document"
            name="document"
            type="text"
            size="small"
            value={formValues.document}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>검사자</FormLabelStyled>
          <OutlinedInputStyled
            id="inspector"
            name="inspector"
            type="text"
            size="small"
            value={formValues.inspector}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>모델명</FormLabelStyled>
          <Select
            id="model_id"
            name="model_id"
            value={formValues.model_id}
            onChange={(e) => handleSelectChange(e, 'model_id')}
            displayEmpty
            size="small"
            sx={{ width: '100%', maxWidth: '300px' }}
          >
            <MenuItem value="" disabled>
              <Typography>모델 선택</Typography>
            </MenuItem>
            {models?.map((model: ICategory) => (
              <MenuItem key={model.id} value={model.id}>
                {model.model_name}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>수량</FormLabelStyled>
          <OutlinedInputStyled
            id="quantity"
            name="quantity"
            type="number"
            size="small"
            value={formValues.quantity}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>제조일자</FormLabelStyled>
          <OutlinedInputStyled
            id="manufacture_date"
            name="manufacture_date"
            type="date"
            size="small"
            value={formValues.manufacture_date}
            onChange={handleChange}
          />
        </FormGrid>

        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>출고지</FormLabelStyled>
          <Select
            id="company_id"
            name="company_id"
            value={formValues.company_id}
            onChange={(e) => handleSelectChange(e, 'company_id')}
            displayEmpty
            size="small"
            sx={{ width: '100%', maxWidth: '300px' }}
          >
            <MenuItem value="" disabled>
              <Typography>출고지 선택</Typography>
            </MenuItem>
            {companies?.map((company: ICompany) => (
              <MenuItem key={company.id} value={company.id}>
                {company.company_name}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>출고일자</FormLabelStyled>
          <OutlinedInputStyled
            id="inspection_date"
            name="inspection_date"
            type="date"
            size="small"
            value={formValues.inspection_date}
            onChange={handleDateChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 4 }} className="flex flex-row justify-between">
          <Box></Box>
          <Button
            variant="contained"
            sx={{
              color: 'background.paper',
              bgcolor: '#4BA36B',
              alignSelf: 'end',
              width: { xs: '300px', sm: 'auto' },
            }}
            onClick={() => addProductToRow()}
          >
            <FontAwesomeIcon className="mr-2" icon={faChevronDown} />
            제품입력
          </Button>
        </FormGrid>
      </Grid>
      <Grid spacing={1} container className="w-full flex flex-row">
        <Grid size={11} spacing={1} container className="flex flex-row">
          <Grid
            container
            spacing={1}
            size={4}
            sx={{
              border: '1px solid',
              borderRadius: '8px',
              padding: '8px',
              borderColor: 'text.secondary',
            }}
            className="flex flex-col"
          >
            <Typography variant="h6">AED</Typography>

            <BarcodeScanner barcode={aedBarcode} setBarcode={setAedBarcode} />
          </Grid>
          <Grid
            container
            spacing={1}
            size={4}
            sx={{
              border: '1px solid',
              borderRadius: '8px',
              padding: '8px',
              borderColor: 'text.secondary',
            }}
            className="flex flex-col"
          >
            <Typography variant="h6">배터리</Typography>
            <BarcodeScanner
              barcode={batteryBarcode}
              setBarcode={setBatteryBarcode}
            />
          </Grid>
          <Grid
            container
            spacing={1}
            size={4}
            sx={{
              border: '1px solid',
              borderRadius: '8px',
              padding: '8px',
              borderColor: 'text.secondary',
            }}
            className="flex flex-col"
          >
            <Typography variant="h6">패즈</Typography>

            <BarcodeScanner barcode={padsBarcode} setBarcode={setPadsBarcode} />
          </Grid>
        </Grid>{' '}
        <Grid
          container
          spacing={1}
          size={1}
          className="flex flex-col justify-between"
        >
          {/* <Button
            variant="contained"
            sx={{
              color: 'background.paper',
              bgcolor: '#4BA36B',
              alignSelf: 'center',
              width: { xs: '300px', sm: 'auto' },
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            제품입력
          </Button> */}

          {/* <Box className="flex flex-row justify-center">
            <Typography>{rows.length}</Typography>
            <Typography>/{formValues.quantity}</Typography>
          </Box> */}
          <Box></Box>
          <Button
            variant="contained"
            sx={{
              color: 'background.paper',
              bgcolor: '#4BA36B',
              alignSelf: 'center',
              width: { xs: '300px', sm: 'auto' },
            }}
            onClick={() => addProductToRow()}
          >
            <FontAwesomeIcon className="mr-2" icon={faChevronDown} />
            제품등록
          </Button>
        </Grid>
      </Grid>
      <Grid className="w-full">
        <DataGrid
          autoHeight
          editMode="row"
          rows={rows}
          columns={columns}
          // processRowUpdate={handleProcessRowUpdate}
          // rowModesModel={rowModesModel}
          // onRowModesModelChange={handleRowModesModelChange}
          // onRowEditStop={handleRowEditStop}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
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
          color: 'background.paper',
          bgcolor: '#4BA36B',
          alignSelf: 'end',
          width: { xs: '300px', sm: 'auto' },
        }}
      >
        입력완료
      </Button>
    </Grid>
  );
};
