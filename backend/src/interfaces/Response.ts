export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA'
| 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT' | 'INVALID_TEAM';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED' | 'NO_CONTENT',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;