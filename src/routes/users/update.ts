import { StatusCodes } from 'http-status-codes';
import { APIRoute, HTTPMethod, ApiErrorCode, UpdateUserResponse } from '../../types';
import { APIError } from '../../lib/utils/api-error';
import { findUserById, updateUser } from '../../services';
import { isUuid } from '../../lib/utils/isUuid';

export default {
  method: HTTPMethod.PUT,
  url: '/user/:id',
  controller: async (req, res, next): Promise<UpdateUserResponse> => {
    const { firstname, lastname, email } = req.body;
    const { id } = req.params;

    if (!isUuid(id)) {
      throw new APIError(
        'The uuid is not compatible with id',
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'UpdateUser',
      );
    }

    const user = await findUserById(id);

    if (!user) {
      throw new APIError(
        "Can't find the user",
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'UpdateUser',
      );
    }

    const updatedUser = await updateUser(id, firstname, lastname, email);

    return updatedUser;
  },
} as APIRoute;
