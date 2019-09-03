import * as debug from 'debug';
import { Application } from 'express';
import { init } from './app';
import { MongoRestOrmConfig } from './types';
import { extendedJoi } from './utils/extended-joi';

// TODO: Find a way to extend e.Application
class MongoRestOrmServer {
  public static async createServer(app: Application, config: MongoRestOrmConfig) {
    debug.enable(`*mongorestorm:${config.logger}*`);
    const mrosApp = await init(app, config);
    return new MongoRestOrmServer(mrosApp);
  }

  constructor(
    private app: Application,
  ) {}

  public getApp(): Application {
    return this.app;
  }

  // TODO: Allow method specific middlewares to be added.
  public addMiddlewares(...middlewares: any[]): void {
    for (const middleware of middlewares) {
      if (Array.isArray(middleware)) {
        const path = middleware.shift();
        this.app.use(path, ...middleware);
      } else {
        this.app.use(middleware);
      }
    }
  }

  public startServer(port: number, hostname?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const callback = (error: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };
      if (hostname) {
        this.app.listen(port, hostname, callback);
      } else {
        this.app.listen(port, callback);
      }
    });
  }
}

export {
  extendedJoi,
  MongoRestOrmServer,
};
