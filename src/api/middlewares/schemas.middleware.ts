import {
  NextFunction,
  Request,
  Response,
} from 'express';

export const schemasMiddleware = (schemas: any): any => {
  return (req: Request, _: Response, next: NextFunction): void => {
    req.schemas = schemas;
    next();
  };
};
