import { Response } from 'express';
import { AnySchema } from 'joi';
import { HTTPCode, ApiErrorCode } from '../../types';
import Config from '../../lib/utils/config';
import { APIError } from './api-error';

export function respondSuccess(res: Response, data: unknown, code = HTTPCode.OK) {
  res.setHeader('Content-Type', 'application/json');

  const response = { status: 'ok', data };
  const parsed =
    Config.NODE_ENV === 'development'
      ? JSON.stringify(response, null, 4)
      : JSON.stringify(response);

  return res.status(code).send(parsed);
}

export function validateRequestPayload(body: any, schema: AnySchema): Promise<any> {
  const buildPath = (path: (string | number)[]) => {
    return (
      path.reduce((p, n) => {
        p += typeof n === 'string' ? `.${n}` : `[${n}]`;

        return p;
      }, '') as string
    ).slice(1);
  };

  return new Promise((resolve, reject) => {
    const { error, value } = schema.validate(body, {
      convert: false,
      stripUnknown: true,
    });
    if (error) {
      const message = `Request validation failed: ${error.details[0].message} (${buildPath(
        error.details[0].path,
      )})`;

      return reject(
        new APIError(
          message,
          HTTPCode.BAD_REQUEST,
          true,
          ApiErrorCode.BadCredentials,
          'validation',
        ),
      );
    }

    return resolve(value);
  });
}
