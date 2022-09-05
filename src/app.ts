import express, {Request, Response, NextFunction} from 'express';
import preMiddlewares from './middlewares/pre/index';
import userRoutes from "./routes/user.routes";
import {BaseError} from "./lib/utils/base-error";
import {ErrorHandler} from "./lib/utils/error-handler";
import {logger} from "./lib/utils/logger";
import {APIError} from "./lib/utils/api-error";

const app = express();

console.log(__dirname)

for(const middleware of preMiddlewares) {
    app.use(...middleware)
}

const errorHandler = new ErrorHandler(logger);

process.on('uncaughtException', async (error: Error) => {
    await errorHandler.handleError(error)
    if(!errorHandler.isTrustedAndBaseError(error)) process.exit(1)
})

process.on('unhandledRejection', (reason: Error) => {
    throw reason
})

export const errorMiddleware = async (err:APIError | BaseError, req: Request, res: Response, next: NextFunction) => {
    if(!errorHandler.isTrustedAndBaseError(err)) {
        next(err);
    }
    const message = err instanceof APIError ? err.message : 'Initial server Error';
    res.status((<BaseError>err)?.httpCode || 500).send({error_code: err.errorCode, message:err.message, http_code:err.httpCode})
    await errorHandler.handleError(err)
}


app.use(userRoutes)
app.use(errorMiddleware)

export default app;