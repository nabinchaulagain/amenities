const APIError = require('./APIError');

const validateBody = (schema, data) => {
  const { error } = schema.validate(data, {
    abortEarly: false,
    errors: {
      wrap: {
        label: ''
      }
    }
  });
  if (error) {
    const errDetail = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});
    throw new APIError({ error: 'Invalid body', detail: errDetail }, 400);
  }
};

module.exports = validateBody;
