import { AnySchema } from 'joi';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HTTPMethod } from '../HTTP';
import { AccessLevel } from '../User';

export type APIRoute = {
  method: HTTPMethod;
  url: string;
  schema?: AnySchema;
  access?: AccessLevel[];
  middleware?: any[];
  controller: (req: Request, res: Response, next: NextFunction) => void;
};
