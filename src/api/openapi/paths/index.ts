import aggregate = require('./aggregate');
import countDocuments = require('./count-documents');
import deleteMany = require('./delete-many');
import deleteOne = require('./delete-one');
import distinct = require('./distinct');
import find = require('./find');
import findOne = require('./find-one');
import insertMany = require('./insert-many');
import insertOne = require('./insert-one');
import updateMany = require('./update-many');
import updateOne = require('./update-one');

export const paths = {
  '/collections/{collectionName}/insert-one': insertOne._,
  '/collections/{collectionName}/insert-many': insertMany._,
  '/collections/{collectionName}/find-one': findOne._,
  '/collections/{collectionName}/find': find._,
  '/collections/{collectionName}/find/to-array': find.toArray,
  '/collections/{collectionName}/aggregate': aggregate._,
  '/collections/{collectionName}/aggregate/to-array': aggregate.toArray,
  '/collections/{collectionName}/distinct': distinct._,
  '/collections/{collectionName}/count-documents': countDocuments._,
  '/collections/{collectionName}/update-one': updateOne._,
  '/collections/{collectionName}/update-many': updateMany._,
  '/collections/{collectionName}/delete-one': deleteOne._,
  '/collections/{collectionName}/delete-many': deleteMany._,
};
