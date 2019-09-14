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
 * GET /collections/{collectionName}/find
 * Find
 */
export const findController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('findController');
    const collectionName = req.swagger.params.collectionName.value;
    const filter = req.swagger.params.filter.value;
    const options = req.swagger.params.options.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const cursor = await req.mongo
      .collection(collectionName, model)
      .find(filter, options);
    try {
      cursor.on('data', (data) => {
        res.sse('data', data);
      });
      cursor.on('end', () => {
        res.sse('end');
      });
      cursor.on('close', () => {
        res.sse('close');
        res.end();
        logger.succeeded('findController');
      });
    } catch (error) {
      logger.failed('findController', error);
      res.sse('error', error);
      res.sse('close');
      res.end();
    }
  } catch (error) {
    logger.failed('findController', error);
    res.jsend.error(error);
  }
};

/**
 * GET /collections/{collectionName}/find/to-array
 * Find To Array
 */
export const findToArrayController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('findToArrayController');
    const collectionName = req.swagger.params.collectionName.value;
    const filter = req.swagger.params.filter.value;
    const options = req.swagger.params.options.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const cursor = await req.mongo
      .collection(collectionName, model)
      .find(filter, options);
    const documents = await cursor.toArray();
    res.jsend.success(documents);
    logger.succeeded('findToArrayController');
  } catch (error) {
    logger.failed('findToArrayController', error);
    res.jsend.error(error);
  }
};
