export const _ = {
  delete: {
    ['x-router-controller']: 'index',
    description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#deleteOne',
    operationId: 'deleteOneController',
    parameters: [
      {
        in: 'path',
        name: 'collectionName',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      content: {
        ['application/json']: {
          schema: {
            type: 'object',
            properties: {
              filter: {
                type: 'object',
              },
              options: {
                type: 'object',
              },
            },
          },
        },
      },
      required: true,
      ['x-name']: 'body',
    },
    responses: {
      ['2XX']: {
        description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#~deleteWriteOpResult',
        content: {
          ['application/json']: {
            schema: {
              type: 'object',
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
