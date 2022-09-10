import { AnySchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { HTTPMethod } from '../HTTP/http.status';


export type APIRoute = {
    method: HTTPMethod;
    url: string;
    schema?: AnySchema;
    controller: (req: Request, res: Response, next: NextFunction) => void;
}