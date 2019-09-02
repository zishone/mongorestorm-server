import { AppContext } from '../../types';
import { Logger } from '../helpers/logger';
import { MongoManager } from '../helpers/mongo-manager';

const log = new Logger(__filename);

const connectMongo = async (context: AppContext): Promise<AppContext> => {
  try {
    context.mongo = await MongoManager.connect(context.config.mongo.uri, context.config.mongo.dbName, context.config.mongo.clientOptions, context.config.mongo.dbOptions);
  } catch (error) {
    log.warn('Could not connect to database %O', error);
  }
  return context;
};

export { connectMongo };
