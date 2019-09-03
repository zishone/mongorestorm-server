import { Application } from 'express';
import {
  AppContext,
  MongoRestOrmConfig,
} from '../../types';

// TODO: Set config defaults here
const createContext = async (app: Application, config: MongoRestOrmConfig): Promise<AppContext> => {
  const context = {
    app,
    config,
  };
  return context;
};

export { createContext };
