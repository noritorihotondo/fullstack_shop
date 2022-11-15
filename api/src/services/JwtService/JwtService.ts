import * as jwt from 'jsonwebtoken';
import Config from '../../lib/utils/config';

import { AccessLevel, TokenClaims } from '../../types';

export const createNewToken = async (user: any): Promise<string | any> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
        accessLevel: user.accessLevel || AccessLevel.USER,
      },
      Config.TOKEN_ACCESS_SECRET,
      { expiresIn: '6000s' },
      (err, payload) => {
        if (err) return reject(err);

        return resolve(payload);
      },
    );
  });
};

export const createRefreshToken = async (user: any) => {
  return new Promise((resolve, reject) => {
    const payload = { id: user.id };

    jwt.sign(payload, Config.TOKEN_REFRESH_SECRET, (err, payload) => {
      if (err) return reject(err);

      return resolve(payload);
    });
  });
};

export const verifyToken = async (token: string): Promise<TokenClaims> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, Config.TOKEN_ACCESS_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }

      return resolve(payload as TokenClaims);
    });
  });
};

interface DecodeOptions {
  complete?: boolean | undefined;
  json?: boolean | undefined;
}

export const decodeTokenPayload = (token: string) => {
  return jwt.decode(token, { complete: true })?.payload;
};
