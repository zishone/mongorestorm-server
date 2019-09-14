import { EJSON } from 'bson';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

export const sseMiddleware = (): any => {
  return (_: Request, res: Response, next: NextFunction): void => {
    let messageId = 0;
    res.sse = (event: string, data?: any) => {
      if (messageId === 0) {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
        });
      }
      res.write(`id: ${messageId}\n`);
      res.write(`event: ${event}\n`);
      res.write(`data: ${data ? EJSON.stringify(data) : null}\n\n`);
      messageId++;
    };
    next();
  };
};
