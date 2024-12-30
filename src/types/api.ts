export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public response: ApiErrorResponse,
  ) {
    super(response.message);
    this.name = 'ApiError';
  }

  getFieldErrors(): Record<string, string> {
    if (!this.response.details) return {};
    
    return Object.entries(this.response.details).reduce(
      (acc, [field, errors]) => ({
        ...acc,
        [field]: errors[0], // Get first error message for each field
      }),
      {},
    );
  }
}