import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

// 카테고리 타입 정의
interface Category {
  label: string;
  subCategories: string[];
}

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

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
  let scanBuffer = '';

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

  return (
    <Grid container spacing={3} className="w-3/5 py-10">
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="category1" required>
          Category 1
        </FormLabel>
        <OutlinedInput
          id="category1"
          name="category1"
          type="name"
          placeholder="Category A"
          autoComplete="category1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="category2" required>
          Category 2
        </FormLabel>
        <OutlinedInput
          id="category2"
          name="category2"
          type="category2"
          placeholder="Category B"
          autoComplete="category 2"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="product-name" required>
          Product Name
        </FormLabel>
        <OutlinedInput
          id="product-name"
          name="product-name"
          type="product-name"
          placeholder="CU-SP1"
          autoComplete="product-name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="product-barcode" required>
          Barcode
        </FormLabel>
        <Box className="flex flex-row items-center">
          <OutlinedInput
            className="mr-3 w-1/2 "
            id="product-barcode"
            name="product-barcode"
            type="product-barcode"
            autoComplete="product-barcode"
            value={barcode}
            required
            size="small"
          />
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faRotateLeft}
            onClick={() => setBarcode('')}
          />
        </Box>
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="product-description">Product Description</FormLabel>
        <OutlinedInput
          id="product-description"
          name="product-description"
          type="product-description"
          placeholder="The IPAD CU-SP1 is a semi-automated external defibrillator (AED)."
          autoComplete="product-description"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="accessories" required>
          Accessories
        </FormLabel>
        <OutlinedInput
          id="accessories"
          name="accessories"
          type="accessories"
          placeholder="Carrying Case & Pads"
          autoComplete="accessories"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="series-products" required>
          Series products
        </FormLabel>
        <OutlinedInput
          id="series-products"
          name="series-products"
          type="series-products"
          placeholder="NY"
          autoComplete="series-products"
          required
          size="small"
        />
      </FormGrid>
      <Box
        sx={[
          {
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            alignItems: 'end',
            flexGrow: 1,
            gap: 1,
            pb: { xs: 12, sm: 0 },
            mt: { xs: 2, sm: 0 },
            mb: '60px',
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
      </Box>
    </Grid>
  );
};
