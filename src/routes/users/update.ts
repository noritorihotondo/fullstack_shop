import { StatusCodes } from 'http-status-codes';
import { APIRoute } from '../../types/API';
import { HTTPMethod } from '../../types/HTTP/http.status';
import { APIError } from '../../lib/utils/api-error';
import { ApiErrorCode } from '../../types/HTTP/http.model';
import { findUserById, updateUser } from '../../services';
import { UpdateUserResponse } from '../../types';

export default {
  method: HTTPMethod.PATCH,
  url: '/user/:id',
  controller: async (req, res, next): Promise<UpdateUserResponse> => {
    const { firstname, lastname, email } = req.body;
    const { id } = req.params;
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

    const updatedUser = await updateUser(id, { firstname, lastname, email });

    return updatedUser;
  },
} as APIRoute;
