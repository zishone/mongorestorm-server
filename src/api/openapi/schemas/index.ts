import { GenericModel } from '../../models';

export const schemas: any = {
  generic: new GenericModel().getOasSchema(),
  genericSuccess: {
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
  genericFail: {
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
  genericError: {
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
};
