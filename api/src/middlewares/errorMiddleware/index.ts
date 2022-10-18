import { NextFunction, Request, Response } from 'express';
import { APIError } from '../../lib/utils/api-error';
import { BaseError } from '../../lib/utils/base-error';
import { ErrorHandler } from '../../lib/utils/error-handler';
import { logger } from '../../lib/utils/logger';

const errorHandler = new ErrorHandler(logger);

export const errorMiddleware = async (
  err: APIError | BaseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!errorHandler.isTrustedAndBaseError(err)) {
    next(err);
  }
  const message = err instanceof APIError ? err.message : 'Initial server Error';
  res
    .status((<BaseError>err)?.httpCode || 500)
    .send({ error_code: err.errorCode, message: message, http_code: err.httpCode });
  await errorHandler.handleError(err);
};
