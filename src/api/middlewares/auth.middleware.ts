import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = (secret: string): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const bearerRegex = /^Bearer\s/;
      const payload = verify(req.get('Authorization')!.replace(bearerRegex, ''), secret);
      req.authPaload = payload;
      next();
    } catch (error) {
      res.jsend.fail({
        Authorization: 'Authentication failed.',
      }, 401);
    }
  };
};
