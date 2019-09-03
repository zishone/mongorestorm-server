import { mJoi } from '../../utils/m-joi';
import { Model } from './model';

class InsertRequest extends Model {
constructor() {
    const schema = mJoi.object().keys({
      data: mJoi.alternatives().try(mJoi.object(), mJoi.array().items(mJoi.object())).required(),
      options: mJoi.object().description('http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#insertMany'),
    });
    super(schema);
  }
}

export { InsertRequest };
