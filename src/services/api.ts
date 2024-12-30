export const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

import {ApiError, ApiErrorResponse} from '../types/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({
      message: 'An unexpected error occurred',
    }));
    throw new ApiError(response.status, errorData);
  }
  return response.json();
}

export const api = {
  headers: {
    'Content-Type': 'application/json',
  },

  setAuthToken(token: string | null) {
    if (token) {
      this.headers = {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      };
    } else {
      delete this.headers.Authorization;
    }
  },
};