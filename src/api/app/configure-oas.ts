import { convert } from 'joi-openapi';
import * as oasTools from 'oas-tools';
import { join } from 'path';
import { AppContext } from '../../types';
import oasSpec from '../openapi';

const addSchemas = (context: AppContext, spec: any): void => {
  for (const model in context.config.schemas) {
    if (context.config.schemas.hasOwnProperty(model)) {
      spec.components.schemas[model] = convert(context.config.schemas[model]);
    }
  }
};

const setServers = (context: AppContext, spec: any): void => {
  spec.servers.push({
    url: `${context.config.server.host}${context.config.basePath || ''}/${context.config.mongo.dbName}`,
  });
};

const configureOas = async (context: AppContext): Promise<AppContext> => {
  const oasOptions = {
    controllers: join(__dirname, '..', 'controllers'),
    loglevel: context.config.logger,
    router: true,
    validator: true,
    docs: {
      apiDocs: '/api-docs',
      apiDocsPrefix: context.config.basePath,
      swaggerUi: '/swagger-ui',
      swaggerUiPrefix: context.config.basePath,
    },
  };
  oasTools.configure(oasOptions);
  addSchemas(context, oasSpec);
  setServers(context, oasSpec);
  await new Promise((resolve, reject) => {
    oasTools.initialize(oasSpec, context.app, (error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
  return context;
};

export { configureOas };
