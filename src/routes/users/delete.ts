import { APIRoute } from '../../types/API';
import { HTTPMethod } from '../../types/HTTP/http.status';
import { Request, Response, NextFunction } from 'express';

import { APIError } from '../../lib/utils/api-error';
import { ApiErrorCode } from '../../types/HTTP/http.model';
import { deleteUser } from '../../services';
import { StatusCodes } from 'http-status-codes';

export default {
  method: HTTPMethod.DELETE,
  url: '/user/:id',
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await deleteUser(id);

    if (user.affected === 0) {
      throw new APIError(
        "Can't find the user",
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'DeleteUser',
      );
    }
  },
} as APIRoute;
