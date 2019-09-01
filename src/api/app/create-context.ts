import * as express from 'express';
import {
  AppContext,
  MongoRestOrmConfig,
} from '../../types';

const createContext = async (config: MongoRestOrmConfig): Promise<AppContext> => {
  const context = {
    app: express(),
    config,
  };
  return context;
};

export { createContext };
