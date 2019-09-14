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
 * PUT /collections/{collectionName}/update-one
 * Update One
 */
export const updateOneController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('updateOneController');
    const collectionName = req.swagger.params.collectionName.value;
    const {
      filter,
      update,
      options,
    } = req.swagger.params.body.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const updateOneResult = await req.mongo
      .collection(collectionName, model)
      .updateOne(filter, update, options);
    res.jsend.success(updateOneResult);
    logger.succeeded('updateOneController');
  } catch (error) {
    logger.failed('updateOneController', error);
    res.jsend.error(error);
  }
};
