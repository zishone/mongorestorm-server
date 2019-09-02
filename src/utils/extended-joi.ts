import {
  extend,
  object,
  Root,
  string,
} from '@hapi/joi';
import { ExtendedJoi } from '../types';

const extendedJoi: ExtendedJoi = extend({
  base: object().keys({
    $oid: string().min(24).hex().required(),
  }),
  name: 'oid',
});

export { extendedJoi };
