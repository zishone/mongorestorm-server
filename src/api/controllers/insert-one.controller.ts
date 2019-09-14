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
 * POST /collections/{collectionName}/insert-one
 * Insert One
 */
export const insertOneController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('insertOneController');
    const collectionName = req.swagger.params.collectionName.value;
    const {
      data,
      options,
    } = req.swagger.params.body.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const insertOneResult = await req.mongo
      .collection(collectionName, model)
      .insertOne(data, options);
    res.jsend.success(insertOneResult);
    logger.succeeded('insertManyController');
  } catch (error) {
    logger.failed('insertOneController', error);
    res.jsend.error(error);
  }
};
