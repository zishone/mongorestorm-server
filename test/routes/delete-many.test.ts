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

describe('delete-many', () => {
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

  describe('DELETE /collections/{collectionName}/delete-many', () => {
    it('should return 200', async () => {
      const deleteManyResult: any = {};
      sandbox
        .stub(MongoCollection.prototype, 'deleteMany')
        .returns(Promise.resolve(deleteManyResult));

      const response = await request(app)
        .delete(`/dbs/test/collections/test/delete-many`)
        .send({
          filter: {},
          options: {},
        });

      expect(response.status).to.equals(200);
    });
  });
});
