'use strict';

const Responses = require('../../utils/Responses');
const Dynamo = require('../../utils/Dynamo');

const tableName = process.env.boardsTableName;

exports.handler = async (event) => {
  const boards = await Dynamo.getAll(tableName).catch((err) => {
    console.log('Error in DynamoDB getAll', err);
    return null;
  });

  if (!boards) {
    return Responses.send(500, { message: 'Error fetching boards' });
  }
  return Responses.send(200, { boards });
};
