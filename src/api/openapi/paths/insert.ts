const insert = {
  post: {
    ['x-router-controller']: 'insert-controller',
    description: 'Inserts an array of documents into MongoDB.',
    operationId: 'insert',
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
        'application/json': {
          schema: {
            $ref: '#/components/schemas/InsertRequest',
          },
        },
      },
      required: true,
      ['x-name']: 'body',
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InsertResponse',
            },
          },
        },
      },
    },
  },
};

export default insert;
