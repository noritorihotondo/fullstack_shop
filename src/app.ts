import express from 'express';
import preMiddlewares from './middlewares/pre/index';
import { ErrorHandler } from './lib/utils/error-handler';
import { logger } from './lib/utils/logger';
import routes from './routes';
import { respondSuccess, validateRequestPayload } from './lib/utils/http';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

for (const middleware of preMiddlewares) {
  app.use(...middleware);
}

for (const route of routes) {
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

app.use(errorMiddleware);

export default app;
