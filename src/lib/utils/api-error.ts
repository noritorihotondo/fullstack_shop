import { ApiErrorCode } from '../../types/HTTP/http.model';
import { BaseError } from './base-error';
import { StatusCodes } from 'http-status-codes';
export class APIError extends BaseError {
  constructor(
    message: string,
    httpCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true,
    errorCode: ApiErrorCode,
    methodName: string = '',
  ) {
    super(
      '',
      message.replace(/"|ValidationError:/g, ''),
      httpCode,
      isOperational,
      errorCode,
      methodName,
    );
  }
}
