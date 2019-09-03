import { mJoi } from '../../utils/m-joi';
import { Model } from './model';

class InsertResponse extends Model {
  constructor() {
    const schema = mJoi.object().keys({
      status: mJoi.string().valid('success'),
      data: mJoi.object().description('http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#~insertWriteOpResult'),
    });
    super(schema);
  }
}

export { InsertResponse };
