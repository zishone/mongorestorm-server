export const _ = {
  get: {
    ['x-router-controller']: 'index',
    description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#find',
    operationId: 'findController',
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
        description: 'http://mongodb.github.io/node-mongodb-native/3.2/api/Cursor.html',
        content: {
          ['text/event-stream']: {},
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

export const toArray = {
  get: {
    ['x-router-controller']: 'index',
    description: 'https://mongodb.github.io/node-mongodb-native/3.2/api/Cursor.html#toArray',
    operationId: 'findToArrayController',
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
        description: 'object[]',
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
                    type: 'object',
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
