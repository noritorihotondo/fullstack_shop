import { StatusCodes } from 'http-status-codes';
import { ApiErrorCode } from '../../types';

export class BaseError extends Error {
  public readonly log: string;
  public readonly methodName: string;
  public readonly httpCode: StatusCodes;
  public readonly isOperational: boolean;
  public readonly errorCode: ApiErrorCode;

  constructor(
    log: string,
    message: string | unknown = log,
    httpCode: StatusCodes,
    isOperational = true,
    errorCode: ApiErrorCode,
    methodName?: string,
  ) {
    super(<string>message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.log = log;
    if (methodName) this.methodName = methodName;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;

    Error.captureStackTrace(this);
  }
}
