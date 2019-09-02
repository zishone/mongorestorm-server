import * as express from 'express';
import {
  AppContext,
  MongoRestOrmConfig,
} from '../../types';

// TODO: Set config defaults here
const createContext = async (config: MongoRestOrmConfig): Promise<AppContext> => {
  const context = {
    app: express(),
    config,
  };
  return context;
};

export { createContext };
