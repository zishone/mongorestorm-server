import { extendedJoi } from '../../utils/extended-joi';
import { Model } from './model';

class FailResponse extends Model {
  constructor() {
    const schema = extendedJoi.object().keys({
      status: extendedJoi.string().valid('fail'),
      data: extendedJoi.object(),
    });
    super(schema);
  }
}

export { FailResponse };
