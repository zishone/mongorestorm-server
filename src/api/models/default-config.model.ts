import joi = require('@hapi/joi');
import { Model } from '../helpers';

export class DefaultConfigModel extends Model {
  constructor() {
    const schema = joi.object().keys({
      mongoConfig: joi.object().keys({
        mongoUri: joi.string().default('mongodb://127.0.0.1:27017/'),
        dbName: joi.string().default('test'),
        clientOptions: joi.object().keys({
          useNewUrlParser: joi.boolean().default(true),
          useUnifiedTopology: joi.boolean().default(true),
        }).default({
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).unknown(true),
        dbOptions: joi.object().default({}).unknown(true),
      }).default({
        mongoUri: 'mongodb://127.0.0.1:27017/',
        dbName: 'test',
        clientOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
      corsConfig: joi.object().default({}).unknown(true),
      apiDocsConfig: joi.object().keys({
        apiDocs: joi.string().default('/api-docs'),
        swaggerUi: joi.string().default('/docs'),
      }).default({
        apiDocs: '/api-docs',
        swaggerUi: '/docs',
      }).allow(null).unknown(true),
      authConfig: joi.object().keys({
        secret: joi.string().default('secret'),
      }).default(null),
      logLevel: joi.string().default('info'),
      basePath: joi.string().default(''),
      schemas: joi.object().default({}).unknown(true),
    });
    super(schema);
  }
}
