import collections = require('./collections');

export const paths = {
  '/collections/{collectionName}': collections.insertMany,
};
