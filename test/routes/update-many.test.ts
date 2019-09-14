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

describe('update-many', () => {
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

  describe('PUT /collections/{collectionName}/update-many', () => {
    it('should return 200', async () => {
      const updateManyResult: any = {};
      sandbox
        .stub(MongoCollection.prototype, 'updateMany')
        .returns(Promise.resolve(updateManyResult));

      const response = await request(app)
        .put(`/dbs/test/collections/test/update-many`)
        .send({
          filter: {},
          update: {},
          options: {},
        });

      expect(response.status).to.equals(200);
    });
  });
});
