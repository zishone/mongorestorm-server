import { mJoi } from '../../utils/m-joi';
import { Model } from './model';

class FailResponse extends Model {
  constructor() {
    const schema = mJoi.object().keys({
      status: mJoi.string().valid('fail'),
      data: mJoi.object(),
    });
    super(schema);
  }
}

export { FailResponse };
