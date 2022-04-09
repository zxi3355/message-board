const Dynamo = require('../utils/Dynamo');
const tableName = process.env.boardsTableName;

exports.handler = async (event, context, callback) => {
  console.log('event: ', JSON.stringify(event));

  const boardName = event.Records[0].body;
  const newBoard = await Dynamo.write({ name: boardName }, tableName).catch(
    (err) => {
      console.log(`Error writing to DynamoDB table ${tableName}`, err);
      return null;
    }
  );

  let response;
  if (newBoard) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'SQS Board event processed.',
        input: event,
      }),
    };
  } else {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'SQS Board event failed.',
        input: event,
      }),
    };
  }

  callback(null, response);
};
