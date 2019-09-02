import { Response } from 'express';
import { Request } from '../../types';
import { extendedJoi } from '../../utils/extended-joi';
import { Logger } from '../helpers/Logger';

const log = new Logger(__filename);

const insert = async (req: Request, res: Response , next: any) => {
  try {
    const collectionName = req.swagger.params.collectionName.value;
    const body = req.swagger.params.body.value;
    const data = Array.isArray(body.data) ? body.data : [ body.data ];
    const options = body.options;

    if (req.context.config.models[collectionName]) {
      const validationResult = extendedJoi.array().items(req.context.config.models[collectionName]).validate(data);
      if (validationResult.error) {
        throw validationResult.error;
      }
    }

    if (req.context.mongo) {
      const insertResult = await req.context.mongo.insert(collectionName, data, options);
      res.status(200).send({
        status: 'success',
        data: insertResult,
      });
    }
  } catch (error) {
    switch (error.name) {
      case 'ValidationError':
        res.status(400).send({
          status: 'fail',
          data: error,
        });
        break;
      default:
        res.status(500).send({
          status: 'error',
          message: error.message,
        });
        break;
    }
  }
};

export { insert };
