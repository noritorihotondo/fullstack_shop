import { AccessLevel } from './../../types/User/user';
import { ApiErrorCode, APIRoute, HTTPMethod, UserStatus } from '../../types';
import { LoginUserSchema } from '../../dto/User/create.user.dto';
import { User } from '../../entities/User';
import { APIError } from '../../lib/utils/api-error';
import { StatusCodes } from 'http-status-codes';
import * as jwtService from '../../services/JwtService';

export default {
  method: HTTPMethod.POST,
  url: '/auth/login/',
  schema: LoginUserSchema,
  controller: async (req, res) => {
    let { email, password } = req.body;

    const user = await User.findOneBy({
      email,
      password,
    });

    if (!user) {
      throw new APIError(
        'Cannot find the user',
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindUser,
        'AuthUser',
      );
    }

    const accessToken = await jwtService.createNewToken(user);
    const refreshToken = await jwtService.createRefreshToken(user);

    await User.update({ id: user.id }, { role: AccessLevel.USER });

    res.cookie('access_token', `Bearer ${accessToken}`, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie('refresh_token', `Bearer${refreshToken}`, {
      httpOnly: true,
    });

    return {
      status: 'singed in',
    };
  },
} as APIRoute;
