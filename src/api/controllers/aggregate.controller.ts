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
 * GET /collections/{collectionName}/aggregate
 * Aggregate
 */
export const aggregateController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('aggregateController');
    const collectionName = req.swagger.params.collectionName.value;
    const pipeline = req.swagger.params.pipeline.value;
    const options = req.swagger.params.options.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const cursor = await req.mongo
      .collection(collectionName, model)
      .aggregate(pipeline, options);
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
        logger.succeeded('aggregateController');
      });
    } catch (error) {
      logger.failed('aggregateController', error);
      res.sse('error', error);
      res.sse('close');
      res.end();
    }
  } catch (error) {
    logger.failed('aggregateController', error);
    res.jsend.error(error);
  }
};

/**
 * GET /collections/{collectionName}/aggregate/to-array
 * Aggregate To Array
 */
export const aggregateToArrayController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('aggregateToArrayController');
    const collectionName = req.swagger.params.collectionName.value;
    const pipeline = req.swagger.params.pipeline.value;
    const options = req.swagger.params.options.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const cursor = await req.mongo
      .collection(collectionName, model)
      .aggregate(pipeline, options);
    const documents = await cursor.toArray();
    res.jsend.success(documents);
    logger.succeeded('aggregateToArrayController');
  } catch (error) {
    logger.failed('aggregateToArrayController', error);
    res.jsend.error(error);
  }
};
