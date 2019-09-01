import paths from './paths';
import schemas from './schemas';
import servers from './servers';

const oasSpec = {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'MongoRestorm',
  },
  paths,
  servers,
  components: {
    schemas,
  },
};

export default oasSpec;
