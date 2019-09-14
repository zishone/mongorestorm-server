import { CorsOptions } from 'cors';
import express = require('express');
import { Server } from 'http';
import { App } from './api/app';
import { Logger } from './api/helpers';
import { MongoConfig } from './api/helpers/mongo-manager';

const logger = new Logger('main', __filename);

export interface MongoRestOrmServerConfig {
  mongoConfig?: MongoConfig;
  corsConfig?: CorsOptions;
  apiDocsConfig?: {
    apiDocs?: string;
    apiDocsPrefix?: string;
    swaggerUi?: string;
    swaggerUiPrefix?: string;
  } | null;
  authConfig?: {
    secret: string;
  } | null;
  logLevel?: string;
  basePath?: string;
  schemas?: any;
}

export class MongoRestOrmServer {
  private server!: Server;

  constructor(private config: MongoRestOrmServerConfig = {}) {}

  public async applyMiddleware(app: express.Application) {
    await new App(app).configure(this.config);
  }

  public async startServer(handler: any) {
    const app = express();
    app.on('ready', () => {
      this.server = app.listen(handler, () => {
        logger.info('Accepting connections at port: %d', handler.port);
      });
    });
    await this.applyMiddleware(app);
    return app;
  }

  public async stopServer() {
    this.server.close();
  }
}
