import {
  json,
  urlencoded,
} from 'express';
import { AppContext } from '../../types';
import { setAccessControl } from '../middlewares/set-accesscontrol';
import { setContext } from '../middlewares/set-context';

const composeMiddlewares = async (context: AppContext): Promise<AppContext> => {
  context.app.use(json());
  context.app.use(urlencoded({ extended: true }));
  context.app.use(setAccessControl(context));
  context.app.use(setContext(context));
  return context;
};

export { composeMiddlewares };
