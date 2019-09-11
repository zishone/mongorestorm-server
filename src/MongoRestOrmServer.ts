import { CorsOptions } from 'cors';
import express = require('express');
import { App } from './api/app';
import { Logger } from './api/helpers';
import { MongoConfig } from './api/helpers/mongo-manager';

const logger = new Logger('index', __filename);

export interface MongoRestOrmServerConfig {
  mongoConfig?: MongoConfig;
  corsConfig?: CorsOptions;
  apiDocsConfig?: {
    apiDocs?: string,
    apiDocsPrefix?: string,
    swaggerUi?: string,
    swaggerUiPrefix?: string,
  };
  logLevel?: string;
  basePath?: string;
  version?: string;
  schemas?: any;
}

export class MongoRestOrmServer {
  constructor(private config: MongoRestOrmServerConfig) {}
  // TODO: Map default configurations
  public async applyMiddleware(app: express.Application) {
    await new App(app).configure(this.config);
  }

  public async startServer(handler: any) {
    const app = express();
    app.on('ready', () => {
      app.listen(handler, () => {
        logger.info('Accepting connections at port: %d', handler.port);
      });
    });
    await new App(app).configure(this.config);
    return app;
  }
}
