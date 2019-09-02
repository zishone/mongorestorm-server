import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { AppContext } from '../../types';

const setAccessControl = (context: AppContext): RequestHandler => {
  return (_: Request, res: Response, next: NextFunction) => {
    if (context.config.accessControl.allowOrigin) {
      res.header('Access-Control-Allow-Origin', context.config.accessControl.allowOrigin);
    }
    if (context.config.accessControl.allowCredentials) {
      res.header('Access-Control-Allow-Credentials', context.config.accessControl.allowCredentials);
    }
    if (context.config.accessControl.allowMethods) {
      res.header('Access-Control-Allow-Methods', context.config.accessControl.allowMethods);
    }
    next();
  };
};

export { setAccessControl };
