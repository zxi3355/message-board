'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  get: async (ID, TableName) => {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();
    if (!data || !data.Item) {
      throw Error(`Error fetching data for id ${ID} from ${TableName}`);
    }
    console.log(data);
    return data.Item;
  },

  write: async (data, TableName) => {
    const Item = {
      ...data,
      ID: uuid.v4(),
    };
    const params = {
      TableName,
      Item,
    };

    const res = await documentClient.put(params).promise();
    if (!res) {
      throw Error(
        `There was an error inserting ID of ${Item.ID} in table ${TableName}`
      );
    }

    return Item;
  },

  query: async (TableName, IndexName, queryKey, queryValue) => {
    const params = {
      TableName,
      IndexName,
      KeyConditionExpression: `${queryKey} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': queryValue,
      },
    };

    const res = await documentClient.query(params).promise();
    return res.Items || [];
  },

  getAll: async (TableName) => {
    const res = await documentClient
      .scan({
        TableName,
      })
      .promise();

    return res.Items;
  },
};

module.exports = Dynamo;
