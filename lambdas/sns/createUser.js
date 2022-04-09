'use strict';

const Dynamo = require('../utils/Dynamo');
const tableName = process.env.usersTableName;

exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event));

  const name = event.Records[0].Sns.Message;
  const email = event.Records[0].Sns.Subject;

  const newUser = await Dynamo.write({ name, email }, tableName).catch(
    (err) => {
      console.log(`Error writing to DynamoDB table ${tableName}`, err);
      return null;
    }
  );

  let response;
  if (newUser) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'SNS user creation processed.',
        input: event,
      }),
    };
  } else {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'SNS user creattion failed.',
        input: event,
      }),
    };
  }

  callback(null, response);
};
