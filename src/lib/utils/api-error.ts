import {APIErrorCode, HttpStatusCode} from "../../types/HTTP/http.model";
import {BaseError} from "./base-error";

export class APIError extends BaseError {
    constructor(message: string,  httpCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, errorCode:APIErrorCode, methodName:string = '') {
        super('', message.replace(/"|ValidationError:/g, ''),  httpCode, isOperational ,errorCode, methodName,);
    }
}
