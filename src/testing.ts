import { MongoRestOrmServer } from '.';

const port = 3000;

new MongoRestOrmServer({
  mongoConfig: {
    mongoUri: 'mongodb://root:password@127.0.0.1:27017/',
    dbName: 'test',
    clientOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  corsConfig: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  apiDocsConfig: {
    apiDocs: '/api-docs',
    apiDocsPrefix: '',
    swaggerUi: '/docs',
    swaggerUiPrefix: '',
  },
  logLevel: 'info',
  serverConfig: {
    ssl: false,
    host: 'localhost',
    port,
    basePath: '/api',
  },
  schemas: {},
}).startServer({ port });
