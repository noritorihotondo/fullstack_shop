import { APIRoute } from '../../types/API';
import { HTTPMethod } from '../../types/HTTP/http.status';
import { Request, Response, NextFunction } from 'express';

import { APIError } from '../../lib/utils/api-error';
import { ApiErrorCode } from '../../types/HTTP/http.model';
import { findUserById } from '../../services';
import { StatusCodes } from 'http-status-codes';

export default {
  method: HTTPMethod.GET,
  url: '/user/id/:id',
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await findUserById(id);

    if (!user) {
      throw new APIError(
        "Can't find the user",
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'GetUserById',
      );
    }

    return user;
  },
} as APIRoute;
