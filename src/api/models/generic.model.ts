import joi = require('@hapi/joi');
import { Model } from '../helpers';

export class GenericModel extends Model {
  constructor() {
    const schema = joi.object();
    super(schema);
  }
}
