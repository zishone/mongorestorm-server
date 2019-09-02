import { JoiObject } from '@hapi/joi';
import { convert } from 'joi-openapi';

class Model {
  constructor(private schema: JoiObject) {}

  public getOasSchema() {
    return convert(this.schema);
  }
}

export { Model };
