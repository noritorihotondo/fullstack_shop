import { APIRoute } from '../../types/API';
import { HTTPMethod } from '../../types/HTTP/http.status';
import { Request, Response, NextFunction } from 'express';

import { APIError } from '../../lib/utils/api-error';
import { ApiErrorCode } from '../../types/HTTP/http.model';
import { findUserByEmail } from '../../services';
import { StatusCodes } from 'http-status-codes';

export default {
  method: HTTPMethod.GET,
  url: '/user/email/:email',
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new APIError(
        "Can't find the user",
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'GetUserByEmail',
      );
    }

    return user;
  },
} as APIRoute;
