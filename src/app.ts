import express, { Request, Response, NextFunction } from 'express';
import preMiddlewares from './middlewares/pre/index';
import { BaseError } from './lib/utils/base-error';
import { ErrorHandler } from './lib/utils/error-handler';
import { logger } from './lib/utils/logger';
import { APIError } from './lib/utils/api-error';
import routes from './routes';
import { respondSuccess, validateRequestPayload } from './lib/utils/http';

const app = express();

for (const middleware of preMiddlewares) {
  app.use(...middleware);
}

for (let route of routes) {
  app[route.method](route.url, async (req, res, next) => {
    try {
      if (route.schema) {
        req.body = await validateRequestPayload(req.body, route.schema);
      }

      const response = await route.controller(req, res, next);

      return respondSuccess(res, response);
    } catch (error) {
      next(error);
    }
  });
}

const errorHandler = new ErrorHandler(logger);

process.on('uncaughtException', async (error: Error) => {
  await errorHandler.handleError(error);
  if (!errorHandler.isTrustedAndBaseError(error)) process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

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
    .send({ error_code: err.errorCode, message: err.message, http_code: err.httpCode });
  await errorHandler.handleError(err);
};

app.use(errorMiddleware);

export default app;
