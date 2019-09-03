import {
  json,
  urlencoded,
} from 'express';
import { AppContext } from '../../types';
import { setAccessControl } from '../middlewares/set-access-control';
import { setContext } from '../middlewares/set-context';
import { setJsend } from '../middlewares/set-jsend';

const composeMiddlewares = async (context: AppContext): Promise<AppContext> => {
  context.app.use(json());
  context.app.use(urlencoded({ extended: true }));
  context.app.use(setAccessControl(context));
  context.app.use(setContext(context));
  context.app.use(setJsend());
  return context;
};

export { composeMiddlewares };
