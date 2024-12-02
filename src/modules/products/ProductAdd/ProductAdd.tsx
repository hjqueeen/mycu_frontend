import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { ReactNode, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import BarcodeScanner from '../BarcodeScanner';
import Typography from '@mui/material/Typography/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useMutation } from 'react-query';
import { ICategory, ICompany } from '../../../shared/models/all.types';
import { useHttp } from '../../../shared/hooks/use-http.hook';
// 카테고리 타입 정의
interface Category {
  label: string;
  subCategories: string[];
}
export interface Barcode {
  udi: string;
  lot: string;
  serial: string;
}

export const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: '8px',
}));

const GridColumnStyled = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
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

export const ProductAdd: React.FC = () => {
  const { categoriesGet, companiesGet } = useHttp();
  const [businessId, setBusinessId] = useState('');
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>('');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  // 오늘 날짜를 기본값으로 설정
  const [inspectionDate, setInspectionDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식
  });

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
  });
  const [padsBarcode, setPadsBarcode] = useState<Barcode>({
    udi: '',
    lot: '',
    serial: '',
  });
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

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
    setInspectionDate(event.target.value); // 선택된 날짜로 업데이트
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 데이터 제출 로직 (예: API 호출)
    console.log({
      category,
      subCategory,
      productName,
      description,
      image,
      videoLink,
      accessories,
      versions,
    });
    // API 요청 등을 통해 DB에 저장하는 로직 구현
  };

  const handleModelChange = (event: SelectChangeEvent, child: ReactNode) => {
    setSelectedModel(event.target.value as string);
  };

  const handleCompanyChange = (event: SelectChangeEvent, child: ReactNode) => {
    setSelectedCompany(event.target.value as string);
  };
  const handleBusinessIdChange = (
    event: SelectChangeEvent,
    child: ReactNode
  ) => {
    setSelectedBusinessId(event.target.value as string);
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
            name="business_name"
            value={selectedBusinessId || ''}
            onChange={handleBusinessIdChange}
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
            id="order_id"
            name="order_id"
            type="text"
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>검사자</FormLabelStyled>
          <OutlinedInputStyled
            id="inspector"
            name="inspector"
            type="text"
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>모델명</FormLabelStyled>
          <Select
            id="model_id"
            name="model_name"
            value={selectedModel || ''}
            onChange={handleModelChange}
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
          {/* <OutlinedInputStyled
            id="model_name"
            name="model_name"
            type="text"
            size="small"
          /> */}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>수량</FormLabelStyled>
          <OutlinedInputStyled
            id="quantity"
            name="quantity"
            type="number"
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>제조일자</FormLabelStyled>
          <OutlinedInputStyled
            id="manufacture_date"
            name="manufacture_date"
            type="date"
            size="small"
          />
        </FormGrid>

        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>출고지</FormLabelStyled>
          <Select
            id="company_id"
            name="company_name"
            value={selectedCompany || ''}
            onChange={handleCompanyChange}
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
          {/* <OutlinedInputStyled
            id="model_name"
            name="model_name"
            type="text"
            size="small"
          /> */}
        </FormGrid>
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>출고일자</FormLabelStyled>
          <OutlinedInputStyled
            id="inspection_date"
            name="inspection_date"
            type="date"
            size="small"
            value={inspectionDate} // 상태로 관리
            onChange={handleDateChange} // 변경 가능하도록
          />
        </FormGrid>
      </Grid>
      <Divider sx={{ width: '100%', marginY: '10px' }} />

      <Grid spacing={1} container className="flex flex-col w-full">
        <Grid
          spacing={1}
          size={{ xs: 4 }}
          className="justify-between flex flex-row"
        >
          <Button
            variant="contained"
            sx={{
              color: 'background.paper',
              bgcolor: '#4BA36B',
              alignSelf: 'start',
              width: { xs: '300px', sm: 'auto' },
            }}
          >
            + 제품스캔
          </Button>

          <Button
            variant="contained"
            sx={{
              color: 'background.paper',
              bgcolor: '#4BA36B',
              alignSelf: 'start',
              width: { xs: '300px', sm: 'auto' },
            }}
          >
            스캔완료 <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
          </Button>
        </Grid>
        <Grid
          container
          size={{ xs: 4 }}
          spacing={1}
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
          size={{ xs: 4 }}
          spacing={1}
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
          size={{ xs: 4 }}
          spacing={1}
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
        <Divider orientation="vertical" className="h-full" />
        <Grid size={{ xs: 8 }}></Grid>
      </Grid>
      {/* <Box
        sx={[
          {
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            alignItems: 'end',
            gap: 1,
            pb: { xs: 12, sm: 0 },
            mt: { xs: 2, sm: 0 },
          },
          { justifyContent: 'flex-end' },
        ]}
      >
        <Button
          variant="contained"
          sx={{
            color: 'background.paper',
            bgcolor: '#4BA36B',
            alignSelf: 'start',
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Save
        </Button>
      </Box> */}
      {/* <Box className="flex flex-row items-center">
          <OutlinedInput
            id="product-barcode"
            name="product-barcode"
            type="date"
            value={barcode}
            size="small"
          />
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faRotateLeft}
            onClick={() => setBarcode('')}
          />
        </Box> */}
    </Grid>
  );
};
