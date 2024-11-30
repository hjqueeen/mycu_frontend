import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import ColorModeSelect from '../../shared/theme/ColorModeSelect';
import { useAuth } from '../../shared/hooks/use-auth.hook';
import { useFetch } from '../../shared/hooks/use-fetch.hook';
import { FacebookIcon, GoogleIcon } from './CustomIcons';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { SignUpData } from '../../shared/models/auth.types';
import { useAuthStore } from '../../shared/store/use-auth.store';
import { useUserStore } from '../../shared/store/use-user.store';
import { useNavigate } from 'react-router-dom';
import { Card, SignInContainer } from './SignInContainer';

export default function SignUp() {
  const { signUp } = useAuth();
  const { handleError, handleRetry } = useFetch();
  const navigate = useNavigate();

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  // Auth store state
  const { setAccessToken } = useAuthStore();

  // User store state
  const { setAccount } = useUserStore();

  const signUpMutation = useMutation((data: SignUpData) => signUp(data), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    onSuccess(data) {
      if (data) {
        if (data.user) {
          setAccount(data.user);
        }
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          navigate('/dashboard');
        }
      }
    },
    onError(error) {
      if (error) {
        const errRes = error?.response;
        if (errRes) {
        }
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError || firstNameError || lastNameError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    if (data) {
      signUpMutation.mutate({
        email: data.get('email') as string,
        password: data.get('password') as string,
        first_name: data.get('first_name') as string,
        last_name: data.get('last_name') as string,
      });
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const firstName = document.getElementById('first_name') as HTMLInputElement;
    const lastName = document.getElementById('last_name') as HTMLInputElement;

    let isValid = true;

    if (!firstName.value.trim()) {
      setFirstNameError(true);
      setFirstNameErrorMessage('First name is required.');
    }

    if (!lastName.value.trim()) {
      setLastNameError(true);
      setLastNameErrorMessage('Last name is required.');
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Card variant="outlined">
        {/* <SitemarkIcon /> */}
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <div className=""></div>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              autoComplete="off"
              type="password"
              id="password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <TextField
              error={firstNameError}
              helperText={firstNameErrorMessage}
              id="first_name"
              type="text"
              name="first_name"
              placeholder="Hans"
              autoComplete="given-name"
              required
              fullWidth
              variant="outlined"
              color={firstNameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <TextField
              error={lastNameError}
              helperText={lastNameErrorMessage}
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Park"
              autoComplete="family-name"
              required
              fullWidth
              variant="outlined"
              color={lastNameError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => validateInputs()}
          >
            Sign up
          </Button>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Google')}
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Facebook')}
            startIcon={<FacebookIcon />}
          >
            Sign up with Facebook
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
