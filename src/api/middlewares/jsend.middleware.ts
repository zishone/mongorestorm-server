import {
  NextFunction,
  Request,
  Response,
} from 'express';

export const jsendMiddleware = (): any => {
  return (_: Request, res: Response, next: NextFunction): void => {
    res.jsend = {
      success: (data: any, statusCode?: number): void => {
        res.status(statusCode || 200);
        res.ejson({
          status: 'success',
          data,
        });
      },
      fail: (data: any, statusCode?: number): void => {
        res.status(statusCode || 400);
        res.ejson({
          status: 'fail',
          data,
        });
      },
      error: (error: any, statusCode?: number): void => {
        const {
          name,
          message,
          code,
          errmsg,
        } = error;
        res.status(statusCode || 500);
        res.ejson({
          status: 'error',
          message: `${name}: ${message}`,
          code,
          data: {
            name,
            message,
            code,
            errmsg,
          },
        });
      },
    };
    next();
  };
};
