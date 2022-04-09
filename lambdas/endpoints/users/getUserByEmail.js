'use strict';

const Responses = require('../../utils/Responses');
const Dynamo = require('../../utils/Dynamo');

const tableName = process.env.usersTableName;

exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.email) {
    // bad request - no email
    return Responses.send(400, { message: 'Missing email from the path' });
  }

  let email = event.pathParameters.email;

  const users = await Dynamo.query(
    tableName,
    'email-index',
    'email',
    email
  ).catch((err) => {
    console.log('Error in DynamoDB get', err);
    return null;
  });

  if (users.length === 0) {
    return Responses.send(404, {
      message: `Failed to get user by emial ${email}`,
    });
  }

  return Responses.send(200, users[0]);
};
