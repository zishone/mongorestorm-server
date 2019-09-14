import {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  Logger,
  Model,
} from '../helpers';

const logger = new Logger('api.controller', __filename);

/**
 * DELETE /collections/{collectionName}/delete-many
 * Delete Many
 */
export const deleteManyController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('deleteManyController');
    const collectionName = req.swagger.params.collectionName.value;
    const {
      filter,
      options,
    } = req.swagger.params.body.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const deleteManyResult = await req.mongo
      .collection(collectionName, model)
      .deleteMany(filter, options);
    res.jsend.success(deleteManyResult);
    logger.succeeded('deleteManyController');
  } catch (error) {
    logger.failed('deleteManyController', error);
    res.jsend.error(error);
  }
};
