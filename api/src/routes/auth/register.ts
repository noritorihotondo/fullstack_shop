import { StatusCodes } from 'http-status-codes';
import { APIError } from '../../lib/utils/api-error';
import { CreateUserSchema } from '../../dto/User/create.user.dto';
import { createUser, findUserByEmail } from '../../services';
import { CreateUserResponse, HTTPMethod, ApiErrorCode, APIRoute } from '../../types';

export default {
  method: HTTPMethod.POST,
  url: '/auth/register',
  schema: CreateUserSchema,
  controller: async (req): Promise<CreateUserResponse> => {
    const { username, email, password } = req.body;

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

    return await createUser({ username, email, password });
  },
} as APIRoute;
