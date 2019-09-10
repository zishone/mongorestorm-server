import {
  GenericModel,
  InsertManyRequest,
} from '../../models';
import {
  createErrorSchema,
  createFailSchema,
  createSuccessSchema,
} from '../../utils';

export const schemas: any = {
  generic: new GenericModel().getOasSchema(),
  genericSuccessResponse: createSuccessSchema('#/components/schemas/generic'),
  genericFailResponse: createFailSchema('#/components/schemas/generic'),
  genericErrorResponse: createErrorSchema('#/components/schemas/generic'),
  insertManyRequest: new InsertManyRequest().getOasSchema(),
};
