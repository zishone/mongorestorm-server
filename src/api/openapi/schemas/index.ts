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
        nullable: true,
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
        nullable: true,
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
            nullable: true,
          },
        ],
      },
      data: {
        $ref: '#/components/schemas/generic',
        nullable: true,
      },
    },
  },
};
