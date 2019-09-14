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

describe('count-documents', () => {
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

  describe('GET /collections/{collectionName}/count-documents', () => {
    it('should return 200', async () => {
      const count: any = 0;
      sandbox
        .stub(MongoCollection.prototype, 'countDocuments')
        .returns(Promise.resolve(count));

      const response = await request(app).get(`/dbs/test/collections/test/count-documents?filter={}&options={}`);

      expect(response.status).to.equals(200);
    });
  });
});
