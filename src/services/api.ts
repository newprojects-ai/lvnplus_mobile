import {ApiError, ApiErrorResponse} from '../types/api';
import {API_BASE_URL} from '../config/env';

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({
      message: 'An unexpected error occurred',
    }));
    throw new ApiError(response.status, errorData);
  }
  return response.json();
}

class ApiService {
  private _headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  get headers(): Record<string, string> {
    return this._headers;
  }

  setAuthToken(token: string | null): void {
    if (token) {
      this._headers.Authorization = `Bearer ${token}`;
    } else {
      delete this._headers.Authorization;
    }
  }
}

export const api = new ApiService();