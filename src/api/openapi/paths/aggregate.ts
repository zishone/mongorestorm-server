export const _ = {
  get: {
    ['x-router-controller']: 'index',
    description: 'https://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#aggregate',
    operationId: 'aggregateController',
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
        name: 'pipeline',
        required: false,
        schema: {
          type: 'array',
          items: {
            type: 'object',
          },
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
        description: 'https://mongodb.github.io/node-mongodb-native/3.2/api/AggregationCursor.html',
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
    description: 'https://mongodb.github.io/node-mongodb-native/3.2/api/AggregationCursor.html#toArray',
    operationId: 'aggregateToArrayController',
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
        name: 'pipeline',
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
