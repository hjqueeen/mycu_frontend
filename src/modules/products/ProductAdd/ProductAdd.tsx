import { Box, Button, FormLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid2';

import ShippingInformation from './ShippingInformation';
import ProductScanner from './ProductScanner';
import { useHttp } from '../../../shared/hooks/use-http.hook';
import { useMutation } from 'react-query';
import ProductDataGrid from './ProductDataGrid';
import { useAuthStore } from '../../../shared/store/use-auth.store';
import { useUserStore } from '../../../shared/store/use-user.store';
import useShared from '../../../shared/hooks/use-shared.hook';
import { Account } from '../../../shared/models/all.types';

export interface Barcode {
  device: string;
  battery: string;
  pads: string;
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

export interface ShippingInfo {
  document: string;
  inspector: Account;
  model_id: string;
  company_id: string;
  business_id: string;
  quantity: string;
  manufacture_date: string;
  inspection_date: string;
}

export const ProductAdd: React.FC = () => {
  const { addProductsPost, companiesGet } = useHttp();
  const { account } = useUserStore();
  const { fullNameGet } = useShared();

  const [rows, setRows] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<ShippingInfo>(() => {
    const today = new Date(); // 오늘 날짜를 기본값으로 설정
    return {
      document: '',
      inspector: account,
      model_id: '',
      company_id: '',
      business_id: '',
      quantity: '',
      manufacture_date: '',
      inspection_date: today.toISOString().split('T')[0], // "YYYY-MM-DD" 형식
    };
  });

  React.useEffect(() => {
    if (account) {
      setFormValues((prev) => ({
        ...prev,
        inspector: account,
      }));
    }
  }, [account]);

  console.log('formValues', formValues, account);

  const { mutate } = useMutation(addProductsPost, {
    onSuccess() {
      const today = new Date();
      setFormValues({
        document: '',
        inspector: account,
        model_id: '',
        company_id: '',
        business_id: '',
        quantity: '',
        manufacture_date: '',
        inspection_date: today.toISOString().split('T')[0],
      });
      setRows([]);
    },
  });

  return (
    <Grid
      container
      spacing={2}
      className="flex flex-col py-10 overflow-y-hidden"
      sx={{ height: '100%' }}
    >
      <ShippingInformation
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <ProductScanner rows={rows} setRows={setRows} />
      <ProductDataGrid rows={rows} />
      <Button
        variant="contained"
        sx={{
          alignSelf: 'end',
          width: { xs: '300px', sm: 'auto' },
        }}
        onClick={() => {
          mutate({ ...formValues, products: rows });
        }}
      >
        입력완료
      </Button>
    </Grid>
  );
};
