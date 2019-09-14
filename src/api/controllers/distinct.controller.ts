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
 * GET /collections/{collectionName}/distinct
 * Distinct
 */
export const distinctController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('distinctController');
    const collectionName = req.swagger.params.collectionName.value;
    const key = req.swagger.params.key.value;
    const filter = req.swagger.params.filter.value;
    const options = req.swagger.params.options.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const values = await req.mongo
      .collection(collectionName, model)
      .distinct(key, filter, options);
    res.jsend.success(values);
    logger.succeeded('distinctController');
  } catch (error) {
    logger.failed('distinctController', error);
    res.jsend.error(error);
  }
};
