import {
  aggregateController,
  aggregateToArrayController,
} from './aggregate.controller';
import { countDocumentsController } from './count-documents.controller';
import { deleteManyController } from './delete-many.controller';
import { deleteOneController } from './delete-one.controller';
import { distinctController } from './distinct.controller';
import {
  findOneController,
} from './find-one.controller';
import {
  findController,
  findToArrayController,
} from './find.controller';
import { insertManyController } from './insert-many.controller';
import { insertOneController } from './insert-one.controller';
import { updateManyController } from './update-many.controller';
import { updateOneController } from './update-one.controller';

export = {
  insertOneController,
  insertManyController,
  findOneController,
  findController,
  findToArrayController,
  aggregateController,
  aggregateToArrayController,
  distinctController,
  countDocumentsController,
  updateOneController,
  updateManyController,
  deleteOneController,
  deleteManyController,
};
