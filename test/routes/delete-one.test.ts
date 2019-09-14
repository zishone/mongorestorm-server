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

describe('delete-one', () => {
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

  describe('DELETE /collections/{collectionName}/delete-one', () => {
    it('should return 200', async () => {
      const deleteOneResult: any = {};
      sandbox
        .stub(MongoCollection.prototype, 'deleteOne')
        .returns(Promise.resolve(deleteOneResult));

      const response = await request(app)
        .delete(`/dbs/test/collections/test/delete-one`)
        .send({
          filter: {},
          options: {},
        });

      expect(response.status).to.equals(200);
    });
  });
});
