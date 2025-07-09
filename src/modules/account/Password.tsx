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
import { Account, State } from '../../shared/models/all.types';
import { useFetch } from '../../shared/hooks/use-fetch.hook';
import { useMutation } from 'react-query';
import { useUsersHttp } from '../../shared/hooks/use-users-http.hook';
import { Link } from 'react-router-dom';
import ForgotPassword from '../sign-in-up/ForgotPassword';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Password = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (passwordError) {
      return;
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
      <ForgotPassword
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <Typography variant="h4" gutterBottom className="w-full mt-4">
        Change Password
      </Typography>
      <FormGrid size={{ xs: 12, md: 8 }}>
        <FormLabel htmlFor="password" required>
          Current Password
        </FormLabel>
        <TextField
          variant="outlined"
          id="password"
          name="password"
          type="text"
          placeholder="Please enter your current password."
          required
          size="small"
          // value={tempAccount?.password}
          // onChange={handleInputChange}
        />

        <Typography
          className="mt-2"
          sx={{ color: 'primary.main' }}
          onClick={() => setModalOpen(true)}
        >
          Forgot your password?
        </Typography>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 8 }}>
        <FormLabel htmlFor="password" required>
          New password
        </FormLabel>
        <TextField
          variant="outlined"
          id="password"
          name="password"
          type="text"
          placeholder="Please enter a new password."
          required
          size="small"
          // value={tempAccount?.password}
          // onChange={handleInputChange}
          error={passwordError}
          helperText={passwordErrorMessage}
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
          Change Password
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
