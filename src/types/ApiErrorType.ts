export interface ApiError {
  response?: {
    data?: {
      message?: string;
    } | string;
  };
  message?: string;
}