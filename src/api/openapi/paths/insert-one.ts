export const _ = {
  post: {
    ['x-router-controller']: 'index',
    description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#insertOne',
    operationId: 'insertOneController',
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
              data: {
                type: 'object',
              },
              options: {
                type: 'object',
              },
            },
            required: [
              'data',
            ],
          },
        },
      },
      required: true,
      ['x-name']: 'body',
    },
    responses: {
      ['2XX']: {
        description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#~insertOneWriteOpResult',
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
