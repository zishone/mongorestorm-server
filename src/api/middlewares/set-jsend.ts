import {
  NextFunction,
  Request,
  RequestHandler,
} from 'express';

const setJsend = (): RequestHandler => {
  return (req: Request, res: any, next: NextFunction) => {
    res.jsend = {
      success: (data: any, statusCode?: number): void => {
        res
          .status(statusCode || 200)
          .send({
            status: 'success',
            data,
          });
      },
      fail: (data: any, statusCode?: number): void => {
        res
          .status(statusCode || 400)
          .send({
            status: 'fail',
            data,
          });
      },
      error: (error: Error, statusCode?: number): void => {
        res
          .status(statusCode || 500)
          .send({
            status: 'error',
            data: error,
            message: error.message,
            code: error.name,
          });
      },
    };
    next();
  };
};

export { setJsend };
