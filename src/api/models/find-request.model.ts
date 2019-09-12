import joi = require('@hapi/joi');
import { Model } from '../helpers';

export class FindRequestModel extends Model {
  constructor() {
    const schema = joi.object().keys({
      filter: joi.object(),
      options: joi.object(),
    });
    super(schema);
  }
}
