import { NextFunction } from 'express';
import { MongoManager } from '../../api/helpers';

declare module 'express' {
  interface Request {
    mongo: MongoManager;
    schemas: any;
    swagger: {
      params: any;
    };
    authPaload: any;
  }

  interface Response {
    jsend: {
      success: (data: any, statusCode?: number) => void;
      fail: (data: any, statusCode?: number) => void;
      error: (error: Error, statusCode?: number) => void;
    };
    ejson: (body?: any) => void;
    sse: (event: string, data?: any) => void;
  }
}