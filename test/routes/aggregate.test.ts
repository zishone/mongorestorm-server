import {
  expect,
  request,
  use,
} from 'chai';
import chaiHttp = require('chai-http');
import { Application } from 'express';
import {
  afterEach,
  describe,
  it,
} from 'mocha';
import { createSandbox } from 'sinon';
import { MongoCollection } from '../../src/api/helpers/mongo-collection';
import { MongoRestOrmServer } from '../../src/index';

use(chaiHttp);

describe('aggregate', () => {
  const sandbox = createSandbox();
  let mongoRestOrmServer: MongoRestOrmServer;
  let app: Application;

  beforeEach(async () => {
    mongoRestOrmServer = new MongoRestOrmServer({
      logLevel: 'custom',
    });
    app = await mongoRestOrmServer.startServer({ port: 3000 });
  });

  afterEach(async () => {
    await mongoRestOrmServer.stopServer();
    sandbox.restore();
  });

  describe('GET /collections/{collectionName}/aggregate', () => {
    it('should return 200', async () => {
      const document = {};
      const cursor: any = {
        on: (event: string, listener: any) => {
          switch (event) {
            case 'data':
              listener(document);
              break;
            case 'end':
              listener();
              break;
            case 'close':
              listener();
              break;
          }
        },
      };
      sandbox
        .stub(MongoCollection.prototype, 'aggregate')
        .returns(Promise.resolve(cursor));

      const response = await request(app).get(`/dbs/test/collections/test/aggregate?pipeline=[{},{}]&options={}`);

      expect(response.status).to.equals(200);
    });
  });

  describe('GET /collections/{collectionName}/aggregate/to-array', () => {
    it('should return 200', async () => {
      const documents = [{}];
      const cursor: any = {
        toArray: async () => documents,
      };
      sandbox
        .stub(MongoCollection.prototype, 'aggregate')
        .returns(Promise.resolve(cursor));

      const response = await request(app).get(`/dbs/test/collections/test/aggregate/to-array?pipeline=[{},{}]&options={}`);

      expect(response.status).to.equals(200);
    });
  });
});
