import { StatusCodes } from 'http-status-codes';
import { ApiErrorCode } from '../../types';
import { BaseError } from './base-error';

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
