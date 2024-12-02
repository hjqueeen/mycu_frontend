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
}));

const GridColumnStyled = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const FormLabelStyled = styled(FormLabel)(() => ({
  width: '120px',
  marginRight: '6px',
}));

export const OutlinedInputStyled = styled(OutlinedInput)(() => ({
  width: '100%',
  maxWidth: '300px',
}));

const fetchModels = async () => {
  const response = await fetch('/api/models'); // API 엔드포인트
  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }
  return response.json(); // 모델 데이터 반환
};

export const ProductAdd: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>('');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
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
  let scanBuffer = '';
  const { mutate, data: models, isLoading, isError } = useMutation(fetchModels);
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

  // 카테고리 데이터
  const categories: Record<string, Category> = {
    electronics: {
      label: '전자제품',
      subCategories: ['휴대폰', '노트북', '가전제품'],
    },
    fashion: {
      label: '패션',
      subCategories: ['의류', '액세서리', '신발'],
    },
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

  return (
    <Grid
      container
      spacing={2}
      className="flex flex-col py-10"
      sx={{ height: '100%' }}
    >
      <Grid spacing={1} container className="w-full">
        <FormGrid size={{ xs: 4 }}>
          <FormLabelStyled>주문번호</FormLabelStyled>
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
          <FormLabelStyled>검사일</FormLabelStyled>
          <OutlinedInputStyled
            id="inspection_date"
            name="inspection_date"
            type="date"
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
              <Typography> 모델을 선택하세요</Typography>
            </MenuItem>
            {models?.map((model: { id: string; name: string }) => (
              <MenuItem key={model.id} value={model.id}>
                {model.name}
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
