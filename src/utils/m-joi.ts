import {
  extend,
  object,
  SchemaLike,
  string,
  ValidationResult,
} from '@hapi/joi';
import { MJoi } from '../types';

const mJoi: MJoi = extend({
  base: object().keys({
    $oid: string().min(24).hex().required(),
  }),
  name: 'oid',
});

mJoi.validateMany = (schema: SchemaLike, data: any[]): ValidationResult<any[]> => {
  return mJoi.array().items(schema).validate(data);
};

export { mJoi };
