'use strict';

const Dynamo = require('../utils/Dynamo');
const tableName = process.env.messagesTableName;

exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event));

  const message = event.Records[0].Sns.Message;
  const meta = event.Records[0].Sns.Subject;
  const [board, user] = meta.split('|');

  const newMessage = await Dynamo.write(
    { message, board, user },
    tableName
  ).catch((err) => {
    console.log(`Error writing to DynamoDB table ${tableName}`, err);
    return null;
  });

  let response;
  if (newMessage) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'SNS message processed.',
        input: event,
      }),
    };
  } else {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'SNS message failed.',
        input: event,
      }),
    };
  }

  callback(null, response);
};
