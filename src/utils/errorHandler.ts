import { ApiError } from "../types/ApiErrorType";

export const getErrorMessage = (error: ApiError): string => {
  if (error.response?.data) {
    const backendError = error.response.data;
    
    if (typeof backendError === 'object' && backendError.message) {
      return backendError.message;
    }
    
    if (typeof backendError === 'string') {
      return backendError;
    }
  }

  if (error.message?.includes('Network Error')) {
    return "Erro de conexão. Verifique sua internet.";
  }
  
  return "Erro interno no servidor. Tente novamente!";
};