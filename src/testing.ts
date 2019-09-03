import * as Joi from '@hapi/joi';
import * as express from 'express';
import { mJoi, MongoRestOrmServer } from '.';

const app = express();

const server = new MongoRestOrmServer({
  mongo: {
    uri: 'mongodb://root:password@127.0.0.1:27017/',
    dbName: 'test', // TODO: Make this part of the basePath
    clientOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  server: {
    host: 'http://localhost:3000',
  },
  accessControl: {
    allowOrigin: '*',
    allowMethods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
    allowCredentials: 'false',
  },
  basePath: '/test',
  logger: 'info',
  schemas: {
   User: mJoi.object().keys({
    _id: mJoi.oid(),
    client_id: mJoi.oid(),
    username: mJoi.string(),
   }),
  },
});

server.applyMiddleware(app);

app.listen({ port: 3000 }, () => {
  console.log('INFO: Accepting connections at http://localhost:', 3000);
});
