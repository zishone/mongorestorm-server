import { paths } from './paths';
import { responses } from './responses';
import { schemas } from './schemas';
import { servers } from './servers';

export const spec = {
  openapi: '3.0.0',
  info: {
    version: require('../../../package.json').version,
    title: 'mongorestorm-server',
  },
  paths,
  servers,
  components: {
    responses,
    schemas,
  },
};
