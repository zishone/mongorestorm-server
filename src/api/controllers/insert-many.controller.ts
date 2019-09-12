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
 * POST /collections/{collectionName}/insert-many
 * Insert Many
 */
export const insertManyController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('insertManyController');
    const collectionName = req.swagger.params.collectionName.value;
    const {
      data,
      options,
    } = req.swagger.params.body.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const insertResult = await req.mongo
      .collection(collectionName, model)
      .insert(data, options);
    res.jsend.success(insertResult);
  } catch (error) {
    logger.failed('insertManyController', error);
    res.jsend.error(error);
  }
};
