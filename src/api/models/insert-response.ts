import { JoiObject } from '@hapi/joi';
import { convert } from 'joi-openapi';
import { extendedJoi } from '../../utils/extended-joi';

class InsertResponse {
  private schema: JoiObject;

  constructor() {
    this.schema = extendedJoi.object().keys({
      status: extendedJoi.string().valid('success'),
      data: extendedJoi.object().description('http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#~insertWriteOpResult'),
    });
  }

  public getOasSchema() {
    return convert(this.schema);
  }
}

export { InsertResponse };
