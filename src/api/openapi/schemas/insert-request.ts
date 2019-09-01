const insertRequest = {
  type: 'object',
  properties: {
    data: {
      oneOf: [
        {
          type: 'object',
        },
        {
          type: 'array',
          items: {
            type: 'object',
          },
        },
      ],
    },
    options: {
      type: 'object',
    },
  },
};

export default insertRequest;
