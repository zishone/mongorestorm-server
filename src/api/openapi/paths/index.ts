import aggregate = require('./aggregate');
import find = require('./find');
import insertMany = require('./insert-many');

export const paths = {
  '/collections/{collectionName}/insert': insertMany._,
  '/collections/{collectionName}/find': find._,
  '/collections/{collectionName}/find/to-array': find.toArray,
  '/collections/{collectionName}/aggregate': aggregate._,
  '/collections/{collectionName}/aggregate/to-array': aggregate.toArray,
};
