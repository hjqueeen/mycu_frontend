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
import { FormGrid, FormLabelStyled, OutlinedInputStyled } from './ProductAdd';

const businessIds = ['224-81-2409-81', '224-81-24096'];

const ShippingInformation = () => {
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

  return (
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
              {model.model_number}
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
        <FormLabelStyled>검사일자</FormLabelStyled>
        <OutlinedInputStyled
          id="inspection_date"
          name="inspection_date"
          type="date"
          size="small"
          value={formValues.inspection_date}
          onChange={handleDateChange}
        />
      </FormGrid>
      {/* <FormGrid size={{ xs: 4 }} className="flex flex-row justify-between">
        <Box></Box>
        <Button
          variant="contained"
          sx={{
            color: 'background.paper',
            bgcolor: '#4BA36B',
            alignSelf: 'end',
            width: { xs: '300px', sm: 'auto' },
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faChevronDown} />
          제품입력
        </Button>
      </FormGrid> */}
    </Grid>
  );
};

export default React.memo(ShippingInformation);
