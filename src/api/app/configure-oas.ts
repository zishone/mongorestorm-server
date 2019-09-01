import * as oasTools from 'oas-tools';
import { join } from 'path';
import { AppContext } from '../../types';
import oasSpec from '../openapi';

const setServers = (context: AppContext, spec: any): void => {
  spec.servers.push({
    url: `${context.config.server.host}${context.config.basePath}`,
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
