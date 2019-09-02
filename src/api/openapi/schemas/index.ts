import { ErrorResponse } from '../../models/error-response';
import { FailResponse } from '../../models/fail-response';
import { InsertRequest } from '../../models/insert-request';
import { InsertResponse } from '../../models/insert-response';

const schemas = {
  InsertRequest: new InsertRequest().getOasSchema(),
  InsertResponse: new InsertResponse().getOasSchema(),
  FailResponse: new FailResponse().getOasSchema(),
  ErrorResponse: new ErrorResponse().getOasSchema(),
};

export { schemas };
