import { StatusCodes } from 'http-status-codes';
import { APIRoute, HTTPMethod, ApiErrorCode } from '../../types';
import { APIError } from '../../lib/utils/api-error';
import { findUserByEmail } from '../../services';
import { isValidEmail } from '../../lib/utils/isValidEmail';

export default {
  method: HTTPMethod.GET,
  url: '/user/email/:email',
  controller: async (req, res, next) => {
    const { email } = req.params;

    if (!(await isValidEmail(email))) {
      throw new APIError(
        'Emails do not match',
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'GetUserByEmail',
      );
    }

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
