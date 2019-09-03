import * as Joi from '@hapi/joi';
import * as express from 'express';
import { extendedJoi, MongoRestOrmServer } from '.';

MongoRestOrmServer.createServer(express(), {
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
  models: {
   User: Joi.object().keys({
    _id: extendedJoi.oid(),
    client_id: extendedJoi.oid(),
    username: Joi.string(),
   }),
  },
})
  .then((server) => {
    server.startServer(3000, '127.0.0.1')
      .then(() => {
        console.log('INFO: Accepting connections at http://localhost:', 3000);
      });
  });
