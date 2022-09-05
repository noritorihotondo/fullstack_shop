import {APIErrorCode, HttpStatusCode} from "../../types/HTTP/http.model";

export class BaseError extends Error {
    public readonly log: string;
    public readonly methodName: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    public readonly errorCode:APIErrorCode

    constructor(
        log: string,
        message: string | unknown = log,
        httpCode: HttpStatusCode,
        isOperational = true,
        errorCode: APIErrorCode,
        methodName?: string,

) {
        super(<string>message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.log = log;
        if (methodName) this.methodName = methodName;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.errorCode= errorCode

        Error.captureStackTrace(this);
    }
}