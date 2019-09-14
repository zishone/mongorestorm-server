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

describe('find-one', () => {
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

  describe('GET /collections/{collectionName}/find-one', () => {
    it('should return 200', async () => {
      const document: any = {};
      sandbox
        .stub(MongoCollection.prototype, 'findOne')
        .returns(Promise.resolve(document));

      const response = await request(app).get(`/dbs/test/collections/test/find-one?filter={}&options={}`);

      expect(response.status).to.equals(200);
    });
  });
});
