import { StatusCodes } from 'http-status-codes';
import { APIRoute, HTTPMethod, ApiErrorCode } from '../../types';
import { APIError } from '../../lib/utils/api-error';
import { findUserById } from '../../services';
import { isUuid } from '../../lib/utils/isUuid';

export default {
  method: HTTPMethod.GET,
  url: '/user/id/:id',
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
