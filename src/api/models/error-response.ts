import { mJoi } from '../../utils/m-joi';
import { Model } from './model';

class ErrorResponse extends Model {
  constructor() {
    const schema = mJoi.object().keys({
      status: mJoi.string().valid('error'),
      message: mJoi.string(),
      code: mJoi.alternatives().try(mJoi.number(), mJoi.string()),
      data: mJoi.object(),
    });
    super(schema);
  }
}

export { ErrorResponse };
