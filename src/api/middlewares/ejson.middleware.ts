import { EJSON } from 'bson';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

export const ejsonMiddleware = (): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.body) {
      req.body = EJSON.deserialize(req.body);
    }
    if (req.query.filter) {
      req.query.filter = EJSON.parse(req.query.filter);
    }
    if (req.query.pipeline) {
      req.query.pipeline = EJSON.parse(req.query.pipeline);
    }
    res.ejson = (body: any) => {
      res.send(EJSON.serialize(body));
    };
    next();
  };
};
