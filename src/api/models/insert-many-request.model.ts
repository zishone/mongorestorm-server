import joi = require('@hapi/joi');
import { Model } from '../helpers';

export class InsertManyRequest extends Model {
  constructor() {
    const schema = joi.object().keys({
      data: joi.array().min(1).items(joi.object()).required(),
      options: joi.object(),
    });
    super(schema);
  }
}
