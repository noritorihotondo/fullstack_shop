import { StatusCodes } from 'http-status-codes';
import { APIError } from '../../lib/utils/api-error';
import { ApiErrorCode, APIRoute, HTTPMethod } from '../../types';
import { markAsDeleted } from '../../services';
import { isUuid } from '../../lib/utils/isUuid';
import * as Auth from '../../middlewares/auth/auth';

export default {
  method: HTTPMethod.DELETE,
  url: '/user/:id',
  middleware: [Auth.protectLogInUsers],
  controller: async (req, res, next) => {
    const { id } = req.params;

    if (!isUuid(id)) {
      throw new APIError(
        'The uuid is not compatible with id',
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'GetUserById',
      );
    }

    const markedUser = await markAsDeleted(id);

    if (!markedUser) {
      throw new APIError(
        "Can't mark the user",
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'GetUserById',
      );
    }

    return markedUser;
  },
} as APIRoute;
