import {
  Request,
  Response,
} from '../../types';
import { mJoi } from '../../utils/m-joi';
import { Logger } from '../helpers/Logger';

const log = new Logger(__filename);

const insert = async (req: Request, res: Response , next: any) => {
  try {
    const collectionName = req.swagger.params.collectionName.value;
    const body = req.swagger.params.body.value;
    const data = Array.isArray(body.data) ? body.data : [ body.data ];
    const options = body.options;

    if (req.context.config.schemas[collectionName]) {
      const validationResult = mJoi.validateMany(req.context.config.schemas[collectionName], data);
      if (validationResult.error) {
        throw validationResult.error;
      }
    }

    // TODO: Do something about this.
    if (req.context.mongo) {
      const insertResult = await req.context.mongo.insert(collectionName, data, options);
      res.jsend.success(insertResult);
    }
  } catch (error) {
    switch (error.name) {
      case 'ValidationError':
        res.jsend.fail(error);
        break;
      default:
        res.jsend.error(error);
        break;
    }
  }
};

export { insert };
