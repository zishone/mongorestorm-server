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
 * PUT /collections/{collectionName}/update-many
 * Update Many
 */
export const updateManyController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('updateManyController');
    const collectionName = req.swagger.params.collectionName.value;
    const {
      filter,
      update,
      options,
    } = req.swagger.params.body.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const updateManyResult = await req.mongo
      .collection(collectionName, model)
      .updateMany(filter, update, options);
    res.jsend.success(updateManyResult);
    logger.succeeded('updateManyController');
  } catch (error) {
    logger.failed('updateManyController', error);
    res.jsend.error(error);
  }
};
