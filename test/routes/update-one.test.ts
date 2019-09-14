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

describe('update-one', () => {
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

  describe('PUT /collections/{collectionName}/update-one', () => {
    it('should return 200', async () => {
      const updateOneResult: any = {};
      sandbox
        .stub(MongoCollection.prototype, 'updateOne')
        .returns(Promise.resolve(updateOneResult));

      const response = await request(app)
        .put(`/dbs/test/collections/test/update-one`)
        .send({
          filter: {},
          update: {},
          options: {},
        });

      expect(response.status).to.equals(200);
    });
  });
});
