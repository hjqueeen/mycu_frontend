import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useMutation } from 'react-query';
import { ICategory, ICompany } from '../../../shared/models/all.types';
import { useHttp } from '../../../shared/hooks/use-http.hook';
import {
  FormGrid,
  FormLabelStyled,
  OutlinedInputStyled,
  ShippingInfo,
} from './InspectionAdd';
import { fullNameGet } from '../../../shared/utils/shared.util';

const ShippingInformation = ({
  formValues,
  setFormValues,
  setSelectedModelNumber,
}: {
  formValues: ShippingInfo;
  setFormValues: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  setSelectedModelNumber: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { categoriesGet, companiesGet } = useHttp();

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

  const handleDateChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = event.target.value as string;
      setFormValues((prev) => ({
        ...prev,
        ['inspection_date']: selectedDate,
      }));
    },
    [setFormValues]
  );

  const handleSelectChange = React.useCallback(
    (event: SelectChangeEvent, name: string) => {
      const selectedValue = event.target.value as string;

      setFormValues((prev) => ({
        ...prev,
        [name]: selectedValue, // 필드 이름에 따라 상태 업데이트
      }));
      console.log('name', name);

      // Export model number for inspection report
      if (name === 'model_id') {
        const model = models?.find((m) => m.id === selectedValue);
        console.log('model', model);

        setSelectedModelNumber(model?.model_number || '');
      }
    },
    [setFormValues]
  );

  const handleChange = React.useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | { name?: string; value: unknown }
      >
    ) => {
      const { name, value } = event.target;
      setFormValues((prev) => ({
        ...prev,
        [name as string]: value, // 필드 이름에 따라 상태 업데이트
      }));
    },
    [setFormValues]
  );

  return (
    <Grid spacing={1} container className="w-full">
      <FormGrid size={{ xs: 4 }}>
        <FormLabelStyled>사업자등록번호</FormLabelStyled>
        <OutlinedInputStyled
          disabled
          id="business_id"
          name="business_id"
          type="text"
          size="small"
          value={formValues.business_id}
        />
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
          disabled
          id="inspector"
          name="inspector"
          type="text"
          size="small"
          value={fullNameGet(formValues.inspector)}
          // onChange={handleChange}
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
          disabled
          id="inspection_date"
          name="inspection_date"
          type="date"
          size="small"
          value={formValues.inspection_date}
        />
      </FormGrid>
    </Grid>
  );
};

export default ShippingInformation;
