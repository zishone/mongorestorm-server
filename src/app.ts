import { Application } from 'express';
import { composeMiddlewares } from './api/app/compose-middlewares';
import { configureOas } from './api/app/configure-oas';
import { connectMongo } from './api/app/connect-mongo';
import { createContext } from './api/app/create-context';
import {
  AppContext,
  MongoRestOrmConfig,
} from './types';

const init = async (app: Application, config: MongoRestOrmConfig) => {
  let context: AppContext;
  context = await createContext(app, config);
  context = await composeMiddlewares(context);
  context = await configureOas(context);
  context = await connectMongo(context);
  return context.app;
};

export { init };
