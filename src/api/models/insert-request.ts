import { extendedJoi } from '../../utils/extended-joi';
import { Model } from './model';

class InsertRequest extends Model {
constructor() {
    const schema = extendedJoi.object().keys({
      data: extendedJoi.alternatives().try(extendedJoi.object(), extendedJoi.array().items(extendedJoi.object())).required(),
      options: extendedJoi.object().description('http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#insertMany'),
    });
    super(schema);
  }
}

export { InsertRequest };
