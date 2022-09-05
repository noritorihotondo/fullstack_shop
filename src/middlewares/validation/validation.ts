import {NextFunction, Request, Response} from "express";
import {APIError} from "../../lib/utils/api-error";
import {APIErrorCode, HttpStatusCode} from "../../types/HTTP/http.model";


export const Validation = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error, value} = schema.validate(req.body, {
            convert: false,
            stripUnknown: true,
        })
        console.log(error.toString())
        if(error) {
           next(new APIError(error.toString(), HttpStatusCode.BAD_REQUEST, true, APIErrorCode.BadCredentials))
        } else {
            next()
        }
    }
}

