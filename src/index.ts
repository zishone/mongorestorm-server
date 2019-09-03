import * as debug from 'debug';
import * as express from 'express';
import { Application } from 'express';
import { Server } from 'http';
import { init } from './app';
import { MongoRestOrmConfig } from './types';
import { mJoi } from './utils/m-joi';

class MongoRestOrmServer {
  private app!: Application;

  constructor(private config: MongoRestOrmConfig) {
    debug.enable(`*mongorestorm:${config.logger}*`);
  }

  public async applyMiddleware(app: Application): Promise<Application> {
    this.app = await init(app, this.config);
    return this.app;
  }

  public async listen(handle: any, callback?: () => void): Promise<Server> {
    this.app = await this.applyMiddleware(express());
    return this.app.listen(handle, callback);
  }
}

export {
  mJoi,
  MongoRestOrmServer,
};
