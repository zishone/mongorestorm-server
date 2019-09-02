import { extendedJoi } from '../../utils/extended-joi';
import { Model } from './model';

class ErrorResponse extends Model {
  constructor() {
    const schema = extendedJoi.object().keys({
      status: extendedJoi.string().valid('error'),
      message: extendedJoi.string(),
    });
    super(schema);
  }
}

export { ErrorResponse };
