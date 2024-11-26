import {
  Alert,
  Box,
  Button,
  FormLabel,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { styled } from '@mui/system';
import { useUserStore } from '../../shared/store/use-user.store';
import { Account } from '../../shared/models/all.types';
import { useFetch } from '../../shared/hooks/use-fetch.hook';
import { useMutation } from 'react-query';
import { useUsersHttp } from '../../shared/hooks/use-users-http.hook';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const AccountPage = ({ defaultValue }: { defaultValue: Account }) => {
  const { userEmailPatch, userProfilePatch } = useUsersHttp();
  const { handleError, handleRetry } = useFetch();
  const { setAccount } = useUserStore();

  const [tempAccount, setTempAccount] = useState<Account | any>({
    email: '',
    first_name: '',
    last_name: '',
    street: '',
    house_number: '',
    address_detail: '',
    zip_code: '',
    place: '',
    country: '',
    telephone: '',
  });
  const [open, setOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  // const [readOnly, setReadOnly] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  useLayoutEffect(() => {
    defaultValue && setTempAccount(defaultValue);
  }, [defaultValue]);

  const userEmailPatchMutation = useMutation(
    (data: any) => userEmailPatch(data),
    {
      retry: (failureCount, error: any) => handleRetry(failureCount, error),
      onSuccess(data, variables) {
        if (data) {
          const updatedAccount = defaultValue;
          updatedAccount.email = variables.email;
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

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const updatedAccount = tempAccount;
      updatedAccount[name] = value;
      setTempAccount(updatedAccount);
    },
    [tempAccount, setTempAccount]
  );

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

  const handleSubmitEmail = async () => {
    if (validateEmails()) {
      try {
        // setReadOnly(true);
        userEmailPatchMutation.mutate({
          id: tempAccount.id,
          email: tempAccount.email,
        });
      } catch (error) {
        console.error('이메일 변경 실패', error);
      }
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

  return (
    <Grid container spacing={3} className="w-full lg:w-3/5 py-10">
      <Typography variant="h4" gutterBottom className="w-full">
        Email address for membership
      </Typography>
      <Grid
        size={{ xs: 12 }}
        className="flex flex-row "
        sx={{ alignItems: !emailError ? 'flex-end' : 'center' }}
      >
        <FormGrid size={{ xs: 12 }}>
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
            // inputProps={{ readOnly: readOnly }}
            value={tempAccount?.email}
            error={emailError}
            helperText={emailErrorMessage}
            onFocus={() => {
              // setReadOnly(false);
              setEmailError(false);
              setEmailErrorMessage('');
            }}
            onChange={handleInputChange}
            variant="outlined"
          />
        </FormGrid>
      </Grid>
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
          },
          { justifyContent: 'flex-end' },
        ]}
      >
        <Button
          className="w-auto h-9"
          variant="contained"
          onClick={() => handleSubmitEmail()}
        >
          Email Save
        </Button>
      </Box>
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
          value={tempAccount?.first_name}
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
          value={tempAccount?.last_name}
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
          size="small"
          value={tempAccount?.telephone}
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
          value={tempAccount?.street}
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
          value={tempAccount?.house_number}
          onChange={handleInputChange}
        />
      </FormGrid>
      {/*   <FormGrid size={{ xs: 12 }}>
      <FormLabel htmlFor="address_detail">Adressdetails</FormLabel>
        <TextField
          variant="outlined"
          id="address_detail"
          name="address_detail"
          type="text"
          size="small"
          autoComplete="address-line3"
          value={tempAccount?.address_detail}
          onChange={handleInputChange}
        />
      </FormGrid> */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="zip_code">Zip code</FormLabel>
        <TextField
          variant="outlined"
          id="zip_code"
          name="zip_code"
          type="text"
          size="small"
          value={tempAccount?.zip_code}
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
          size="small"
          value={tempAccount?.place}
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="country">Country</FormLabel>
        <TextField
          variant="outlined"
          id="country"
          name="country"
          type="text"
          size="small"
          value={tempAccount?.country}
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
          },
          { justifyContent: 'flex-end' },
        ]}
      >
        <Button
          className="w-auto h-9"
          variant="contained"
          onClick={(event) => handleSubmit(event)}
        >
          Profile Save
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
