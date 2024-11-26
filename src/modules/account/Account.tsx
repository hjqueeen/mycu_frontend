import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormLabel,
  IconButton,
  OutlinedInput,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useUserStore } from '../../shared/store/use-user.store';
import Divider from '@mui/material/Divider/Divider';
import { Account } from '../../shared/models/all.types';
import { useFetch } from '../../shared/hooks/use-fetch.hook';
import { useMutation } from 'react-query';
import { useUsersHttp } from '../../shared/hooks/use-users-http.hook';
import CloseIcon from '@mui/icons-material/Close';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const AccountPage: React.FC = () => {
  const { userEmailPatch, userProfilePatch } = useUsersHttp();
  const { handleError, handleRetry } = useFetch();
  const { account, setAccount } = useUserStore();

  const [tempAccount, setTempAccount] = useState<Account | any>(account);
  const [open, setOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const userEmailPatchMutation = useMutation(
    (data: any) => userEmailPatch(data),
    {
      retry: (failureCount, error: any) => handleRetry(failureCount, error),
      onSuccess(data, variables) {
        if (data) {
          const updatedAccount = account;
          account.email = variables.email;
          setAccount(updatedAccount);
          setOpen(true);
          setNotificationMessage('Your email has been successfully changed.');
        }
      },
      onError(error) {
        if (error) {
          const errRes = error?.response;
          if (errRes) {
            if (errRes.status === 409) {
              setEmailError(true);
              setEmailErrorMessage(
                'The email already exists. Please enter a different email.'
              );
            } else {
              setOpen(true);
              setNotificationMessage(
                'Your email address has not been changed. Please try again later.'
              );
            }
          }
        }
      },
    }
  );

  const userProfilePatchMutation = useMutation(
    (data: any) => userProfilePatch(data),
    {
      retry: (failureCount, error: any) => handleRetry(failureCount, error),
      onSuccess(data) {
        if (data.status === 'SUCCESS') {
          setAccount(tempAccount);
          setOpen(true);
          setNotificationMessage('Your Profile has been successfully changed.');
        }
      },
      onError(error) {
        if (error) {
          const errRes = error?.response;
          if (errRes) {
            setOpen(true);
            setNotificationMessage(
              'Your Profile address has not been changed. Please try again later.'
            );
          }
        }
      },
    }
  );
  // const resetSnackbar = () => {
  //   setTimeout(() => {
  //     setOpen(false);
  //     setNotificationMessage('');
  //   }, 5000);
  // };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedAccount = tempAccount;
    updatedAccount[name] = value;
    setTempAccount(updatedAccount);
  };

  const validateInputs = () => {
    let isValid = true;
    if (!tempAccount.first_name.trim()) {
      setFirstNameError(true);
      setFirstNameErrorMessage('First name is required.');
    }

    if (!tempAccount.last_name.trim()) {
      setLastNameError(true);
      setLastNameErrorMessage('Last name is required.');
    }
    return isValid;
  };

  const validateEmails = () => {
    let isValid = true;
    if (!tempAccount.email || !/\S+@\S+\.\S+/.test(tempAccount.email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    return isValid;
  };

  const handleSubmitEmail = async (submit: boolean) => {
    if (submit) {
      if (validateEmails()) {
        try {
          setReadOnly(true);
          userEmailPatchMutation.mutate({
            id: tempAccount.id,
            email: tempAccount.email,
          });
        } catch (error) {
          console.error('이메일 변경 실패', error);
        }
      }
    } else {
      setReadOnly(false);
    }
  };
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        userProfilePatchMutation.mutate(tempAccount);
      } catch (error) {
        console.error('회원정보 변경 실패:', error);
      }
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  console.log('open', account);

  return (
    <Grid container spacing={3} className="w-3/5 py-10">
      <Typography variant="h4" gutterBottom className="w-full">
        Email address for membership
      </Typography>
      <Grid
        size={{ xs: 12 }}
        className="flex flex-row "
        sx={{ alignItems: !emailError ? 'flex-end' : 'center' }}
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
            defaultValue={tempAccount?.email}
            error={emailError}
            helperText={emailErrorMessage}
            onFocus={() => {
              setReadOnly(false);
              setEmailError(false);
              setEmailErrorMessage('');
            }}
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
        <TextField
          variant="outlined"
          id="first_name"
          name="first_name"
          type="text"
          placeholder="First Name"
          required
          size="small"
          defaultValue={tempAccount?.first_name}
          onChange={handleInputChange}
          error={firstNameError}
          helperText={firstNameErrorMessage}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last_name" required>
          Last Name
        </FormLabel>
        <TextField
          variant="outlined"
          id="last_name"
          name="last_name"
          type="text"
          placeholder="Last Name"
          required
          size="small"
          defaultValue={tempAccount?.last_name}
          onChange={handleInputChange}
          error={lastNameError}
          helperText={lastNameErrorMessage}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="telephone">Mobile phone</FormLabel>
        <TextField
          variant="outlined"
          id="telephone"
          name="telephone"
          type="tel"
          // placeholder="0179 439 7891"
          size="small"
          defaultValue={tempAccount?.telephone}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="street">Street</FormLabel>
        <TextField
          variant="outlined"
          id="street"
          name="street"
          type="text"
          size="small"
          autoComplete="address-line1"
          defaultValue={tempAccount?.street}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="house_number">House Number</FormLabel>
        <TextField
          variant="outlined"
          id="house_number"
          name="house_number"
          type="text"
          size="small"
          autoComplete="address-line2"
          defaultValue={tempAccount?.house_number}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address_detail">Adressdetails</FormLabel>
        <TextField
          variant="outlined"
          id="address_detail"
          name="address_detail"
          type="text"
          size="small"
          autoComplete="address-line3"
          defaultValue={tempAccount?.address_detail}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="zip_code">Zip code</FormLabel>
        <TextField
          variant="outlined"
          id="zip_code"
          name="zip_code"
          type="text"
          // placeholder="13587"
          size="small"
          defaultValue={tempAccount?.zip_code}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="place">City</FormLabel>
        <TextField
          variant="outlined"
          id="place"
          name="place"
          type="text"
          // placeholder="Berlin"
          size="small"
          defaultValue={tempAccount?.place}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="country">Country</FormLabel>
        <TextField
          variant="outlined"
          id="country"
          name="country"
          type="text"
          // placeholder="Germany"
          size="small"
          defaultValue={tempAccount?.country}
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
          onClick={(event) => handleSubmit(event)}
        >
          Save
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
