import { JoiObject } from '@hapi/joi';
import { convert } from 'joi-openapi';
import { extendedJoi } from '../../utils/extended-joi';

class ErrorResponse {
  private schema: JoiObject;

  constructor() {
    this.schema = extendedJoi.object().keys({
      status: extendedJoi.string().valid('error'),
      data: extendedJoi.object(),
    });
  }

  public getOasSchema() {
    return convert(this.schema);
  }
}

export { ErrorResponse };
