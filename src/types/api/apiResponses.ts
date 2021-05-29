export interface ValidationError {
  propertyName: string;
  errorMessage: string;
  severity: string;
  errorCode: string;
}

export interface ResponseException {
  errorCode: string;
  errorMessage: string;
  validationErrors: ValidationError[];
}

export interface ApiPagedResponse<TData> {
  data: Array<TData>;
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  isSuccess: boolean;
  responseException: ResponseException | null;
  statusCode: number;
}

export interface ApiEmptyResponse {
  isSuccess: boolean;
  responseException?: ResponseException;
  statusCode: number;
}

export interface ApiResponse<TData> {
  data: Array<TData>;
  isSuccess: boolean;
  responseException: ResponseException;
  statusCode: number;
}

export interface ApiEmptyDataResponse<TData> {
  data: TData;
  isSuccess: boolean;
  responseException?: ResponseException;
  statusCode: number;
}
