import {
  Alert,
  Box,
  Button,
  Dialog,
  FormLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid2';

import ShippingInformation from './ShippingInformation';
import ProductScanner from './ProductScanner';
import { useHttp } from '../../../shared/hooks/use-http.hook';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../../shared/store/use-auth.store';
import { useUserStore } from '../../../shared/store/use-user.store';
import useShared from '../../../shared/hooks/use-shared.hook';
import { Account } from '../../../shared/models/all.types';
import InspectionAddData from './InspectionAddData';

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

const businessIds = '224-81-24096';

export interface ShippingInfo {
  document: string;
  inspector: Account;
  model_id: string;
  company_id: string;
  business_id: string;
  quantity: number;
  manufacture_date: string;
  inspection_date: string;
}

export const InspectionAdd: React.FC = () => {
  const { addProductsPost, companiesGet } = useHttp();
  const { account } = useUserStore();
  const { fullNameGet } = useShared();

  const [rows, setRows] = useState<any[]>([]);
  const [selectedModelNumber, setSelectedModelNumber] = useState('');
  const [formValues, setFormValues] = useState<ShippingInfo>(() => {
    const today = new Date(); // 오늘 날짜를 기본값으로 설정
    return {
      document: '',
      inspector: account,
      model_id: '',
      company_id: '',
      business_id: businessIds,
      quantity: 0,
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

  const { mutate } = useMutation(addProductsPost, {
    onSuccess() {
      const today = new Date();
      setFormValues({
        document: '',
        inspector: account,
        model_id: '',
        company_id: '',
        business_id: businessIds,
        quantity: 0,
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
        setSelectedModelNumber={setSelectedModelNumber}
      />
      <ProductScanner
        rows={rows}
        setRows={setRows}
        selectedModelNumber={selectedModelNumber}
      />
      <InspectionAddData rows={rows} />
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
