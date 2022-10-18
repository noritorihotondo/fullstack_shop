import bunyan from 'bunyan';
import { logger } from './logger';
import { BaseError } from './base-error';

export class ErrorHandler {
  logger: bunyan;

  constructor(logger: bunyan) {
    this.logger = logger;
  }

  public async handleError(err: Error): Promise<void> {
    logger.error(err);
  }

  public isTrustedAndBaseError(error: Error) {
    return error instanceof BaseError && error.isOperational;
  }
}
