export const _ = {
  post: {
    ['x-router-controller']: 'index',
    description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#insertMany',
    operationId: 'insertManyController',
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
                type: 'array',
                items: {
                  type: 'object',
                },
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
        description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#~insertWriteOpResult',
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
