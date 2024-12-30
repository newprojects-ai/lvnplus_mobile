import {ApiError} from '../types/api';

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (error instanceof ApiError) {
    return error.getFieldErrors();
  }
  return {};
}