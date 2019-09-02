import * as Joi from '@hapi/joi';
import { extendedJoi, MongoRestOrm } from '.';

new MongoRestOrm({
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
  .getServer()
  .then((server) => {
    server.listen(3000, () => {
      console.log('INFO: Accepting connections at http://localhost:', 3000);
    });
  });
