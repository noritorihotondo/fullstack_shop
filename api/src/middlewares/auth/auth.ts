import { NextFunction, Request, Response } from 'express';
import * as JwtService from '../../services/JwtService/JwtService';
import { User } from '../../entities/User';

export async function protectLogInUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const bearer = req.cookies.access_token;
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'You need to sign in' });
    }
    const token = bearer.split('Bearer ')[1].trim();
    console.log(token);
    if (!token) return res.sendStatus(401);
    const userFromToken = await JwtService.verifyToken(token);
    if (!userFromToken) return res.sendStatus(403);
    const user = await User.findOneBy({ id: userFromToken.id });
    if (!user) return res.status(401).send({ message: "Can't find the user" });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
