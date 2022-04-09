'use strict';

const Responses = {
  send(statusCode = 200, data = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode,
      body: JSON.stringify(data),
    };
  },
};

module.exports = Responses;
