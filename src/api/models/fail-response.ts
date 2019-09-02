import { JoiObject } from '@hapi/joi';
import { convert } from 'joi-openapi';
import { extendedJoi } from '../../utils/extended-joi';

class FailResponse {
  private schema: JoiObject;

  constructor() {
    this.schema = extendedJoi.object().keys({
      status: extendedJoi.string().valid('fail'),
      data: extendedJoi.object(),
    });
  }

  public getOasSchema() {
    return convert(this.schema);
  }
}

export { FailResponse };
