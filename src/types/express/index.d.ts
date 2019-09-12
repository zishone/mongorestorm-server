import { NextFunction } from 'express';
import { MongoManager } from '../../api/helpers';

declare module 'express' {
  interface Request {
    mongo: MongoManager;
    schemas: any;
    swagger: {
      params: any;
    };
  }

  interface Response {
    jsend: {
      success: (data: any, statusCode?: number) => void;
      fail: (data: any, statusCode?: number) => void;
      error: (error: Error, statusCode?: number) => void;
    };
    sse: (event: string, data?: any) => void;
    ejson: (body: any) => void;
  }
}