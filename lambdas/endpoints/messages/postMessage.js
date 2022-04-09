'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'us-east-1' });
const topicArn = process.env.messageTopicARN;

exports.handler = (event, context, callback) => {
  console.log('Event', event, topicArn);
  const input = JSON.parse(event.body);

  const params = {
    Message: input.message,
    Subject: `${input.board}|${input.user}`,
    TopicArn: topicArn,
  };

  console.log('params', params);
  sns.publish(params, (err, data) => {
    let response;
    if (err) {
      console.log('error:', 'Fail to send SNS' + JSON.stringify(err));

      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'ERROR',
        }),
      };
    } else {
      console.log('data:', data);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Request ${data.MessageId} is being processed`,
        }),
      };
    }
    callback(null, response);
  });
};
