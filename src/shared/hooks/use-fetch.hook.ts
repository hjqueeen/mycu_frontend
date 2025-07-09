import { stringify } from 'querystring';
import {
  FetchDataOptions,
  UploadDataOptions,
} from '../models/fetch-data.types';
import { useAuthStore } from '../store/use-auth.store';

class FetchError extends Error {
  constructor(public response: Response, message?: string) {
    super(message);
  }
}

export const useFetch = () => {
  // Auth store state
  const { accessToken } = useAuthStore();

  /**
   * Fetch data by query.
   * @param path Path
   * @param options Fetch options
   * @returns JSON data | Error
   */
  const fetchData = (path: string, options?: FetchDataOptions) => {
    try {
      let query = {};

      const url = `${process.env.REACT_APP_BACKEND_URL}/api/${path}${
        Object.keys(query).length > 0 ? '?' + stringify(query) : ''
      }`;

      return fetch(url, {
        method: options?.method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      }).then(async (response) => {
        if (!response.ok) {
          throw new FetchError(response);
        }
        return await response.json().catch((error) => {
          console.error('Error fetching data:', error);
          return {};
        });
      });
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }
  };

  /**
   * Handle common http errors / status codes.
   * @param status Http response status code
   * @returns Error message
   */
  const handleError = (status: number): string => {
    switch (status) {
      case 401:
        // Logout if unauthorized
        // logout();
        return '';
      default:
        return `Code ${status}: ${'app.fetch.error.response'}`;
    }
  };

  /**
   * Handle http request retry by status code.
   * Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has encountered an error or is otherwise incapable of performing the request.
   * @param failureCount Failure count
   * @param error Error response
   * @returns Retrying state
   */
  const handleRetry = (failureCount: number, error: any): boolean => {
    const status = error?.response?.status;
    // Abort retrying after 3 tries
    if (status && status >= 500 && status <= 513 && failureCount < 2) {
      return true;
    } else {
      return false;
    }
  };

  const uploadData = (path: string, options?: UploadDataOptions) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${path}`, {
      method: options?.method,
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${accessToken}`,
      },
      body: options?.formData,
    }).then(async (response) => {
      if (!response.ok) {
        throw new FetchError(response);
      }
      return await response.json();
    });
  };

  return {
    fetchData,
    handleError,
    handleRetry,
    uploadData,
  };
};
