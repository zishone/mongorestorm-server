import { MongoRestOrm } from '.';

new MongoRestOrm({
  mongo: {
    uri: 'mongodb://root:password@127.0.0.1:27017/',
    dbName: 'test',
    clientOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  server: {
    host: 'http://localhost:3000'
  },
  accessControl: {
    allowOrigin: '*',
    allowMethods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
    allowCredentials: 'false',
  },
  basePath: '/test',
  logger: 'info',
})
  .getServer()
  .then((server) => {
    server.listen(3000, () => {
      console.log('INFO: Accepting connections at http://localhost:', 3000);
    });
  });
