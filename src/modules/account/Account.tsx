import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useUserStore } from '../../shared/store/use-user.store';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Account: React.FC = () => {
  const { account } = useUserStore();
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>('');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);

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
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
          Email Address
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="CU-SP1"
          required
          size="small"
          defaultValue={account?.email}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first_name" required>
          First Name
        </FormLabel>
        <OutlinedInput
          id="first_name"
          name="first_name"
          type="name"
          placeholder="First Name"
          required
          size="small"
          defaultValue={account?.first_name}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last_name" required>
          Last Name
        </FormLabel>
        <OutlinedInput
          id="last_name"
          name="last_name"
          type="last_name"
          placeholder="Last Name"
          required
          size="small"
          defaultValue={account?.last_name}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="mobile" required>
          Mobile phone
        </FormLabel>
        <OutlinedInput
          id="mobile"
          name="mobile"
          type="string"
          placeholder="0179 439 7891"
          required
          size="small"
          defaultValue={account?.telephone}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address">Adresse</FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="address"
          placeholder="Müllerstraße 10"
          autoComplete="address"
          required
          size="small"
          defaultValue={account?.address1}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="address">Adressdetails</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="string"
          placeholder="3. Stock rechts"
          size="small"
          defaultValue={account?.address2}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="address">Zip code</FormLabel>
        <OutlinedInput
          id="zip-code"
          name="zip-code"
          type="zip-code"
          placeholder="13587"
          required
          size="small"
          defaultValue={account?.zip_code}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="address">City</FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="string"
          placeholder="Berlin"
          required
          size="small"
          defaultValue={account?.place}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="address">Country</FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="string"
          placeholder="Germany"
          required
          size="small"
          defaultValue={account?.country}
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
