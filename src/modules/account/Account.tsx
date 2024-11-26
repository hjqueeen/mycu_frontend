import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useUserStore } from '../../shared/store/use-user.store';
import Divider from '@mui/material/Divider/Divider';
import { Account } from '../../shared/models/all.types';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const AccountPage: React.FC = () => {
  const { account, setAccount } = useUserStore();

  const [readOnly, setReadOnly] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedAccount = account;
    updatedAccount[name] = value;
    setAccount(updatedAccount);
  };

  const validateInputs = () => {
    let isValid = true;
    if (!account.email || !/\S+@\S+\.\S+/.test(account.email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    console.log('isValid', isValid);

    return isValid;
  };
  const handleSubmitEmail = async (submit: boolean) => {
    if (submit) {
      if (validateInputs()) {
        try {
          setReadOnly(submit);
          // 백엔드로 이메일 보내기
          // await axios.post('YOUR_BACKEND_URL/send-email', { email: account.email });
          // 나머지 정보를 보내는 요청
          // await axios.post('YOUR_BACKEND_URL/signup', account);
          // 성공적으로 전송된 후의 추가 작업을 여기에 추가할 수 있습니다.
        } catch (error) {
          console.error('회원가입 실패:', error);
        }
      } else {
      }
    } else {
      setReadOnly(submit);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
      } catch (error) {
        console.error('회원가입 실패:', error);
      }
    }
  };
  console.log('account', account);

  return (
    <Grid container spacing={3} className="w-3/5 py-10">
      <Typography variant="h4" gutterBottom className="w-full">
        Email address for membership
      </Typography>
      <Grid
        size={{ xs: 12 }}
        className="flex flex-row "
        sx={{ alignItems: readOnly ? 'flex-end' : 'center' }}
      >
        <FormGrid size={{ xs: 11 }}>
          <FormLabel htmlFor="email" required>
            Email Address
          </FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="info@cu.de"
            required
            size="small"
            inputProps={{ readOnly: readOnly }}
            defaultValue={account?.email}
            error={emailError}
            helperText={emailErrorMessage}
            onFocus={() => setReadOnly(false)}
            onChange={handleInputChange}
            variant="outlined"
          />
        </FormGrid>
        <FormGrid size={{ xs: 1 }} className="ml-4">
          <Button
            variant="contained"
            sx={{
              color: 'background.paper',
              bgcolor: '#4BA36B',
              alignSelf: 'start',
              width: { xs: '100%', sm: 'auto' },
              height: '36px',
            }}
            onClick={() => handleSubmitEmail(!readOnly)}
          >
            {readOnly ? 'Edit' : 'Save'}
          </Button>
        </FormGrid>
      </Grid>

      <Typography variant="h4" gutterBottom className="w-full mt-4">
        Profile
      </Typography>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first_name" required>
          First Name
        </FormLabel>
        <OutlinedInput
          id="first_name"
          name="first_name"
          type="text"
          placeholder="First Name"
          required
          size="small"
          defaultValue={account?.first_name}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last_name" required>
          Last Name
        </FormLabel>
        <OutlinedInput
          id="last_name"
          name="last_name"
          type="text"
          placeholder="Last Name"
          required
          size="small"
          defaultValue={account?.last_name}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="mobile" required>
          Mobile phone
        </FormLabel>
        <OutlinedInput
          id="mobile"
          name="mobile"
          type="tel"
          placeholder="0179 439 7891"
          required
          size="small"
          defaultValue={account?.telephone}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address" required>
          Adresse
        </FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="text"
          placeholder="Müllerstraße 10"
          autoComplete="address-line1"
          required
          size="small"
          defaultValue={account?.address1}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="address2">Adressdetails</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="text"
          placeholder="3. Stock rechts"
          size="small"
          defaultValue={account?.address2}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="zip-code" required>
          Zip code
        </FormLabel>
        <OutlinedInput
          id="zip-code"
          name="zip-code"
          type="text"
          placeholder="13587"
          required
          size="small"
          defaultValue={account?.zip_code}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="text"
          placeholder="Berlin"
          required
          size="small"
          defaultValue={account?.place}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="text"
          placeholder="Germany"
          required
          size="small"
          defaultValue={account?.country}
          onChange={handleInputChange}
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
