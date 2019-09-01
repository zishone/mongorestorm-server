import {
  Application,
  Request,
} from 'express';
import {
  MongoClientCommonOption,
  MongoClientOptions,
} from 'mongodb';
import { MongoManager } from '../api/helpers/MongoManager';

export interface AppContext {
  app: Application;
  mongo?: MongoManager;
  config: MongoRestOrmConfig;
}

export interface Request extends Request {
  context: AppContext;
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
  models?: any;
}
