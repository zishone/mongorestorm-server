import { JoiObject } from '@hapi/joi';
import { convert } from 'joi-openapi';
import { extendedJoi } from '../../utils/extended-joi';

class InsertRequest {
  private schema: JoiObject;

  constructor() {
    this.schema = extendedJoi.object().keys({
      data: extendedJoi.alternatives().try(extendedJoi.object(), extendedJoi.array().items(extendedJoi.object())),
      options: extendedJoi.object().description('http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#insertMany'),
    });
  }

  public getOasSchema() {
    return convert(this.schema);
  }
}

export { InsertRequest };
