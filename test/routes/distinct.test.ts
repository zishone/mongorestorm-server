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

describe('distinct', () => {
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

  describe('GET /collections/{collectionName}/distinct', () => {
    it('should return 200', async () => {
      const values: any = [
        true,
        '',
        {},
        0,
      ];
      sandbox
        .stub(MongoCollection.prototype, 'distinct')
        .returns(Promise.resolve(values));

      const response = await request(app).get(`/dbs/test/collections/test/distinct?key=test&filter={}&options={}`);

      expect(response.status).to.equals(200);
    });
  });
});
