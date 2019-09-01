import {
  NextFunction,
  RequestHandler,
  Response,
} from 'express';
import { AppContext } from '../../types';

const setContext = (context: AppContext): RequestHandler => {
  return (req: any, _: Response, next: NextFunction) => {
    req.context = context;
    next();
  };
};

export { setContext };
