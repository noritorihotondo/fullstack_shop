import { APIRoute } from '../../types/API';
import { HTTPMethod } from '../../types/HTTP/http.status';
import { StatusCodes } from 'http-status-codes';
import { APIError } from '../../lib/utils/api-error';
import { ApiErrorCode } from '../../types/HTTP/http.model';
import { CreateUserSchema } from '../../dto/User/create.user.dto';
import { createUser, findUserByEmail } from '../../services';
import { CreateUserResponse } from '../../types';

export default {
  method: HTTPMethod.POST,
  url: '/users',
  schema: CreateUserSchema,
  controller: async (req, res, next): Promise<CreateUserResponse> => {
    const { firstname, lastname, email, password } = req.body;

    const isTaken = await findUserByEmail(email);

    if (isTaken) {
      throw new APIError(
        'Email is already taken',
        StatusCodes.BAD_REQUEST,
        true,
        ApiErrorCode.UserAlreadyExists,
        'CreateUser',
      );
    }

    return await createUser({ firstname, lastname, email, password });
  },
} as APIRoute;
