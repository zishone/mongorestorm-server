import * as debug from 'debug';
import { initializeApp } from './app';
import { MongoRestOrmConfig } from './types';
import { extendedJoi } from './utils/extended-joi';

class MongoRestOrm {
  constructor(private config: MongoRestOrmConfig) {}

  public async getServer() {
    debug.enable(`*mongorestorm:${this.config.logger}*`);
    return await initializeApp(this.config);
  }
}

export {
  extendedJoi,
  MongoRestOrm,
};
