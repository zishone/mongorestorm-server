import { extendedJoi } from '../../utils/extended-joi';
import { Model } from './model';

class InsertResponse extends Model {
  constructor() {
    const schema = extendedJoi.object().keys({
      status: extendedJoi.string().valid('success'),
      data: extendedJoi.object().description('http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#~insertWriteOpResult'),
    });
    super(schema);
  }
}

export { InsertResponse };
