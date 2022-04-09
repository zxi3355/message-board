'use strict';

const Responses = require('../../utils/Responses');
const Dynamo = require('../../utils/Dynamo');

const tableName = process.env.usersTableName;

exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // bad request - no user ID
    return Responses.send(400, { message: 'Missing ID from the path' });
  }

  let ID = event.pathParameters.ID;

  const user = await Dynamo.get(ID, tableName).catch((err) => {
    console.log('Error in DynamoDB get', err);
    return null;
  });

  if (!user) {
    return Responses.send(404, { message: `Failed to get user by ID ${ID}` });
  }

  return Responses.send(200, { user });
};
