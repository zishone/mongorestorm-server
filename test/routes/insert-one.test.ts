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

describe('insert-one', () => {
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

  describe('POST /collections/{collectionName}/insert-one', () => {
    it('should return 200', async () => {
      const insertOneResult: any = {};
      sandbox
        .stub(MongoCollection.prototype, 'insertOne')
        .returns(Promise.resolve(insertOneResult));

      const response = await request(app)
        .post(`/dbs/test/collections/test/insert-one`)
        .send({
          data: {},
          options: {},
        });

      expect(response.status).to.equals(200);
    });
  });
});
