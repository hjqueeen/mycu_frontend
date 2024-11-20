import { useTranslation } from 'react-i18next';
import { MultipleFieldErrors, ValidateResult } from 'react-hook-form';
import { JwtPayload } from '../models/shared.types';
import {
  LoginData,
  LoginResponse,
  RegistrationData,
} from '../models/auth.types';
import { jwtDecode } from 'jwt-decode';
import { useFetch } from './use-fetch.hook';
import { AuthState, useAuthStore } from '../store/use-auth.store';

// Password reg expressions
// const regExpLower = new RegExp('.*[a-z].*');
export const regExpNumber = new RegExp('.*\\d.*');
export const regExpSpecial = new RegExp(
  '.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'
);
export const regExpUpper = new RegExp('.*[A-Z].*');

export const useAuth = () => {
  const { fetchData } = useFetch();
  const { t } = useTranslation();

  // Auth store state
  const [accessToken] = useAuthStore((state: AuthState) => [state.accessToken]);

  /**
   * Compare current date and access token expire date.
   * @returns Auth access validity
   */
  const isAuthenticated = () => {
    return true; // DOTO fix
    // if (accessToken) {
    //   const decodedJWT: JwtPayload = jwtDecode(accessToken);
    //   if (new Date(decodedJWT.exp * 1000) > new Date()) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }
  };

  /**
   * Checks if specific field error match is active
   * @param fieldErrors ValidateResult
   * @param match Field error to match
   * @returns Boolean
   */
  const fieldErrorMatchCheck = (
    fieldErrors: ValidateResult,
    match: string
  ): boolean => {
    if (typeof fieldErrors === 'string') {
      if (fieldErrors === match) {
        return true;
      }
    } else {
      const fieldErrorsArr = fieldErrors as string[];
      if (
        fieldErrorsArr?.length > 0 &&
        fieldErrorsArr.find((fieldError) => fieldError === match)
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * Login user.
   * @param loginData Login data
   * @returns Login response
   */
  const login = async (
    loginData: LoginData
  ): Promise<LoginResponse | undefined> => {
    if (loginData) {
      return await fetchData(`auth/login`, {
        method: 'POST',
        body: loginData,
      });
    }
  };

  /**
   * Handle login http errors.
   * @param status Http response status code
   * @returns Error message
   */
  const loginHandleError = (
    status: number,
    fails: number,
    timeout: number
  ): {
    fails: number;
    message: string;
  } => {
    if ((status === 400 || status === 401) && timeout < 1) {
      if (fails < 3) {
        return {
          fails: fails + 1,
          message: t('auth.login.error.credentials') + '',
        };
      } else {
        return {
          fails: fails + 1,
          message: t('auth.login.error.timeout') + '',
        };
      }
    }
    if (status === 404) {
      return {
        fails,
        message: t('auth.login.error.credentials'),
      };
    }
    return {
      fails,
      message: `Code ${status}: ${t('app.fetch.error.response')}`,
    };
  };

  /**
   * Calculates password strength based on form field errors.
   * @param fieldErrors FieldErrors
   * @returns Password strength as width style
   */
  const passwordStrengthCalc = (fieldErrors: MultipleFieldErrors): string => {
    let errorCount = 0;
    // Check for min length field error
    if (fieldErrors.min) {
      errorCount++;
    }
    // Check for match field errors
    if (fieldErrors.matches) {
      if (typeof fieldErrors.matches === 'string') {
        errorCount++;
      } else {
        const fieldErrorsMatchesArr = fieldErrors.matches as string[];
        errorCount = errorCount + fieldErrorsMatchesArr.length;
      }
    }

    // Calculate password strength as width style
    return 100 - (errorCount / 4) * 100 + '%';
  };

  /**
   * Register user.
   * @param registrationData Registration data
   * @returns Registration data
   */
  const registration = async (
    registrationData: RegistrationData
  ): Promise<RegistrationData | undefined> => {
    if (registrationData) {
      return await fetchData(`auth/registration`, {
        method: 'POST',
        body: registrationData,
      });
    }
  };

  /**
   * Handle registration http errors.
   * @param status Http response status code
   * @returns Error message
   */
  const registrationHandleError = (status: number): string => {
    switch (status) {
      case 409:
        return t('form.profile.email.error.conflict') + '';
      default:
        return `Code ${status}: ${t('app.fetch.error.response')}`;
    }
  };

  /**
   * Calculates timeout string by seconds
   * @param seconds Seconds
   * @returns Timeout string
   */
  const timeoutCalc = (seconds: number): string => {
    const hoursCalc = Math.floor(seconds / 3600);
    const minutesCalc = Math.floor(seconds / 60) % 60;
    const secondsCalc = seconds % 60;

    return [hoursCalc, minutesCalc, secondsCalc]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  return {
    isAuthenticated,
    fieldErrorMatchCheck,
    login,
    loginHandleError,
    passwordStrengthCalc,
    registration,
    registrationHandleError,
    timeoutCalc,
  };
};
