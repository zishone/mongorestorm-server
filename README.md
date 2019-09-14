# mongorestorm-server
[![NPM](https://img.shields.io/npm/v/mongorestorm-server)](https://www.npmjs.com/package/mongorestorm-server) [![Build Status](https://travis-ci.org/zishone/mongorestorm-server.svg?branch=master)](https://travis-ci.org/zishone/mongorestorm-server) [![Coverage Status](https://coveralls.io/repos/github/zishone/mongorestorm-server/badge.svg?branch=master)](https://coveralls.io/github/zishone/mongorestorm-server?branch=master) [![License](https://img.shields.io/npm/l/mongorestorm-server)](https://github.com/zishone/mongorestorm-server/blob/master/LICENSE)

A REST Server abstraction of the commonly used [mongodb@3.2.1](https://www.npmjs.com/package/mongodb) CRUD operations with schema definitions using [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) for data validations.

## Getting Started
### Installation
```shell
$ npm i mongorestorm-server
```

### Usage
#### 1. Import mongorestorm-server
```javascript
const { MongoRestOrmServer } = require('mongorestorm-server');
```
#### 2. Define MongoRestOrmServerConfig
```javascript
const joi = require('@hapi/joi');

const config = {
  mongoConfig: {
    mongoUri: 'mongodb://127.0.0.1:27017/',
    dbName: 'test',
    clientOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    dbOptions: {},
  },
  corsConfig: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  apiDocsConfig: {
    apiDocs: '/api-docs',
    swaggerUi: '/docs',
  },
  authConfig: null,
  logLevel: 'info',
  basePath: '/api',
  schemas: {
    userCollection: joi.object().keys({
      _id: joi.object().keys({
        $oid: joi.string().min(24).hex(),
      }),
      username: joi.string().required(),
      password: joi.string().required(),
    }),
  },
};
```
| MongoRestOrmServerConfig      | Type   | Description | Default                    |
|------------------------------ |------- |------------ |--------------------------- |
| mongoConfig                   | object | MongoDB Server connection configurations.            | `{ mongoUri: 'mongodb://127.0.0.1:27017/', dbName: 'test', clientOptions: { useNewUrlParser: true, useUnifiedTopology: true } }` |
| mongoConfig.mongoUri          | string | MongoDB Server connection string.            | `'mongodb://127.0.0.1:27017/'` |
| mongoConfig.dbName            | string | Database name.            | `'test'`                       |
| mongoConfig.clientOptions     | object | Please refer to: [MongoClientOptions](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html#.connect) | `{ useNewUrlParser: true, useUnifiedTopology: true }`	                     |
| mongoConfig.dbOptions         | object | Please refer to: [MongoClientCommonOption](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html#db)  | `{}` 	                     |
| corsConfig                    | object | Please refer to: [CorsOptions](https://www.npmjs.com/package/cors#configuration-options)                              | `{ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', preflightContinue: false, optionsSuccessStatus: 204 }` 	                     |
| apiDocsConfig                 | string | MongoRestOrm Server uses the OpenAPI 3.0 specification to document and visualize it's API. Use `null` to turn off docs.            | `{ apiDocs: '/api-docs', swaggerUi: '/docs' }`                 |
| apiDocsConfig.apiDocs         | string | Path to access OpenAPI 3.0 specification JSON.            | `'/api-docs'`                  |
| apiDocsConfig.swaggerUi       | string | Path to access OpenAPI 3.0 specification Swagger UI.            | `'/docs'`                     |
| authConfig                    | object | Configurations for built-in authentication.            | `null`                       |
| authConfig.secret             | string | Secret to be used for validating Bearer token passed in the `Authorization` header.            | `'secret'`                     |
| logLevel                      | string | Log level of the application. Log levels: `info`, `warn`, `error`, and `debug`. Use `custom` to turn off logging.            | `'info'`                       |
| basePath                      | string | Prefix path of the MongoRestOrm Server enpoints.            | `''`                         |
| schemas                       | string | Define database schema using @hapi/joi for data validation and visualization in docs.            | `{}`                       |

#### 3. Create MongoRestOrm Server instance
```javascript
const mongoRestOrmServer = new MongoRestOrmServer(config);
```

#### 4. Start MongoRestOrm Server
There are two ways of starting the MongoRestOrm Server.

**Way 1**
```javascript
const port = 3000;
mongoRestOrmServer.startServer({ port });
```
**Way 2**
```javascript
const express = require('express');
const app = express();
const port = 3000;

// Add custom middlewares here.

app.on('ready', () => {
  app.listen(port, () => {
    logger.info('Accepting connections at port: %d', port);
  });
});

mongoRestOrmServer.applyMiddleware(app);
```
Way 2 will a allow adding of custom express middlewares such as own authentication middlewares.

## MongoDB Extended JSON
MongoRestOrm Server serializes and deserializes the data it receives and sends using the [MongoDB Extended JSON (v2)](https://docs.mongodb.com/manual/reference/mongodb-extended-json/) to preserve special MongoDB types such as `ObjectID`.

**Comparisons**
| JSON                                  | EJSON                                           | BSON                                            |
|-------------------------------------- |------------------------------------------------ |------------------------------------------------ |
| `{ _id: 'aaaaaaaaaaaaaaaaaaaaaaaa' }` | `{ _id: { $oid: 'aaaaaaaaaaaaaaaaaaaaaaaa' } }` | `{ _id: ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa') }` |

Packages deserialize the EJSON to a plain jsonn/dict/struct with native/BSON types.
| Language   | Package |
|----------- |-------- |
| Javascript | [bson](https://www.npmjs.com/package/bson) |
| Python     | [pymongo](https://pypi.org/project/pymongo/) |
| Go         | [mongo](https://go.mongodb.org/mongo-driver/mongo/) |

## Recommendations
Usage of this package is only recommended for applications with a microservice architecture and should only have communications with other microservices within the application. Exposing the API to the client might cause some security issues.

## Authors
* **Zishran Julbert Garces**

See also the list of [contributors](https://github.com/zishone/mongorestorm-server/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/zishone/mongorestorm-server/blob/master/LICENSE) file for details.