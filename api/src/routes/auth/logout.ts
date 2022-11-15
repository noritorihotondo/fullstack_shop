import { APIRoute } from './../../types/API/Api';
import { Request, Response } from 'express';
import { HTTPMethod } from './../../types/HTTP/http.status';

export default {
  method: HTTPMethod.GET,
  url: '/auth/logout',
  controller: async (req: Request, res: Response) => {
    res.cookie('access_token', ``, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie('refresh_token', ``, {
      httpOnly: true,
    });

    return {
      status: 'logged out',
    };
  },
} as APIRoute;
