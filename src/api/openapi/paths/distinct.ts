export const _ = {
  get: {
    ['x-router-controller']: 'index',
    description: 'https://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#distinct',
    operationId: 'distinctController',
    parameters: [
      {
        in: 'path',
        name: 'collectionName',
        required: true,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'key',
        required: true,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'filter',
        required: false,
        schema: {
          type: 'object',
        },
      },
      {
        in: 'query',
        name: 'options',
        required: false,
        schema: {
          type: 'object',
        },
      },
    ],
    responses: {
      ['2XX']: {
        description: 'any[]',
        content: {
          ['application/json']: {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  enum: ['success'],
                },
                data: {
                  type: 'array',
                  items: {
                    $ref: '#components/schemas/generic',
                  },
                },
              },
            },
          },
        },
      },
      ['4XX']: {
        $ref: '#components/responses/genericClientError',
      },
      default: {
        $ref: '#components/responses/genericServerError',
      },
    },
  },
};
