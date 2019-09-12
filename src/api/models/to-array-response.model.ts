import joi = require('@hapi/joi');
import { Model } from '../helpers';

export class ToArrayResponseModel extends Model {
  constructor() {
    const schema = joi.array().items(joi.object());
    super(schema);
  }
}
