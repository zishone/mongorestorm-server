import cors = require('cors');
import debug = require('debug');
import {
  Application,
  json,
  urlencoded,
} from 'express';
import oasTools = require('oas-tools');
import { join } from 'path';
import { MongoRestOrmServerConfig } from '../MongoRestOrmServer';
import {
  Model,
  MongoManager,
} from './helpers';
import {
  ejsonMiddleware,
  jsendMiddleware,
  mongoMiddleware,
  schemasMiddleware,
  sseMiddleware,
} from './middlewares';
import { spec } from './openapi';

export class App {
  private config!: MongoRestOrmServerConfig;
  private mongo!: MongoManager;

  constructor(private app: Application) {}

  public async configure(config: MongoRestOrmServerConfig) {
    this.config = config;
    await this.configureLogger();
    await this.connectMongo();
    await this.composeMiddlewares();
    await this.configureOas();
    this.app.emit('ready');
  }

  private async configureLogger(): Promise<void> {
    debug.enable(`*mongorestorm-server:${this.config.logLevel}*`);
  }

  private async composeMiddlewares(): Promise<void> {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors(this.config.corsConfig));
    this.app.use(mongoMiddleware(this.mongo));
    this.app.use(schemasMiddleware(this.config.schemas));
    this.app.use(ejsonMiddleware());
    this.app.use(sseMiddleware());
    this.app.use(jsendMiddleware());
  }

  private async configureOas(): Promise<void> {
    oasTools.configure({
      controllers: join(__dirname, 'controllers'),
      checkControllers: true,
      loglevel: this.config.logLevel,
      strict: true,
      router: true,
      validator: true,
      docs: this.config.apiDocsConfig,
      ignoreUnknownFormats: true,
    });
    spec.info.title = `${this.config.mongoConfig!.dbName} (mongorestorm-server)`;
    spec.info.version = this.config.version!;
    spec.servers.push({
      url: `${this.config.basePath}/dbs/${this.config.mongoConfig!.dbName}`,
    });
    for (const key in this.config.schemas) {
      if (this.config.schemas.hasOwnProperty(key)) {
        spec.components.schemas[key] = new Model(this.config.schemas[key]).getOasSchema();
      }
    }
    await new Promise((resolve, reject) => {
      oasTools.initialize(spec, this.app, (error: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  private async connectMongo(): Promise<void> {
    this.mongo = new MongoManager(this.config.mongoConfig!);
  }
}
