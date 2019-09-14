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
 * GET /collections/{collectionName}/count-documents
 * Count Documents
 */
export const countDocumentsController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('countDocumentsController');
    const collectionName = req.swagger.params.collectionName.value;
    const filter = req.swagger.params.filter.value;
    const options = req.swagger.params.options.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const count = await req.mongo
      .collection(collectionName, model)
      .countDocuments(filter, options);
    res.jsend.success(count);
    logger.succeeded('countDocumentsController');
  } catch (error) {
    logger.failed('countDocumentsController', error);
    res.jsend.error(error);
  }
};
