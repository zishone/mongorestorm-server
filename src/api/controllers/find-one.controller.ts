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
 * GET /collections/{collectionName}/find-one
 * Find One
 */
export const findOneController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('findOneController');
    const collectionName = req.swagger.params.collectionName.value;
    const filter = req.swagger.params.filter.value;
    const options = req.swagger.params.options.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const document = await req.mongo
      .collection(collectionName, model)
      .findOne(filter, options);
    res.jsend.success(document);
    logger.succeeded('findOneController');
  } catch (error) {
    logger.failed('findOneController', error);
    res.jsend.error(error);
  }
};
