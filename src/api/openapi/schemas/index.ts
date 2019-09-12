import {
  FindRequestModel,
  GenericModel,
  InsertManyRequestModel,
  ToArrayResponseModel,
} from '../../models';

export const schemas: any = {
  generic: new GenericModel().getOasSchema(),
  genericSuccessResponse: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['success'],
      },
      data: {
        $ref: '#/components/schemas/generic',
      },
    },
  },
  genericFailResponse: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['fail'],
      },
      data: {
        $ref: '#/components/schemas/generic',
      },
    },
  },
  genericErrorResponse: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['error'],
      },
      message: {
        type: 'string',
      },
      code: {
        oneOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
      },
      data: {
        $ref: '#/components/schemas/generic',
      },
    },
  },
  insertManyRequest: new InsertManyRequestModel().getOasSchema(),
  findRequest: new FindRequestModel().getOasSchema(),
  toArrayResponse: new ToArrayResponseModel().getOasSchema(),
};
