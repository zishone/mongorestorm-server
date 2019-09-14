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
 * DELETE /collections/{collectionName}/delete-one
 * Delete One
 */
export const deleteOneController = async (req: Request, res: Response, _: NextFunction) => {
  try {
    logger.begun('deleteOneController');
    const collectionName = req.swagger.params.collectionName.value;
    const {
      filter,
      options,
    } = req.swagger.params.body.value;
    const model = req.schemas[collectionName] ? new Model(req.schemas[collectionName]) : undefined;
    const deleteOneResult = await req.mongo
      .collection(collectionName, model)
      .deleteOne(filter, options);
    res.jsend.success(deleteOneResult);
    logger.succeeded('deleteOneController');
  } catch (error) {
    logger.failed('deleteOneController', error);
    res.jsend.error(error);
  }
};
