'use strict';

const AWS = require('aws-sdk');
var sqs = new AWS.SQS({ region: 'us-east-1' });

const AWS_ACCOUNT = process.env.ACCOUNT_ID;
const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/BoardQueue`;

exports.handler = (event, context, callback) => {
  const board = JSON.parse(event.body);

  const params = {
    MessageBody: board.name,
    QueueUrl: QUEUE_URL,
  };

  sqs.sendMessage(params, function (err, data) {
    let response;
    if (err) {
      console.log('error:', 'Fail Send Message' + err);

      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'ERROR',
        }),
      };
    } else {
      console.log('data:', data.MessageId);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data.MessageId,
        }),
      };
    }
    callback(null, response);
  });
};
