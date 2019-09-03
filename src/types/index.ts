import {
  ObjectSchema,
  Root,
  SchemaLike,
  ValidationResult,
} from '@hapi/joi';
import {
  Application,
  Request,
  Response,
} from 'express';
import {
  MongoClientCommonOption,
  MongoClientOptions,
} from 'mongodb';
import { MongoManager } from '../api/helpers/mongo-manager';

export interface AppContext {
  app: Application;
  mongo?: MongoManager;
  config: MongoRestOrmConfig;
}

export interface Request extends Request {
  context: AppContext;
  swagger: {
    params: any;
  };
}
export interface Response extends Response {
  jsend: {
    success: (data: any, statusCode?: number) => void;
    fail: (data: any, statusCode?: number) => void;
    error: (error: Error, statusCode?: number) => void;
  };
}

export interface MongoRestOrmConfig {
  mongo: {
    uri: string;
    dbName: string;
    clientOptions?: MongoClientOptions;
    dbOptions?: MongoClientCommonOption;
  };
  server: {
    host: string;
  };
  accessControl: {
    allowOrigin: string;
    allowMethods: string;
    allowCredentials: string;
  };
  basePath?: string;
  logger?: string;
  schemas?: any;
}

export interface MJoi extends Root {
  oid: () => ObjectSchema;
  validateMany: (schema: SchemaLike, data: any[]) => ValidationResult<any[]>;
}
