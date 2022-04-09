## Inplemented features

- User registration: API Gateway => Lambda => SNS => Lambda => DynamoDB
- Get user by email: API Gateway => Lambda (Fetch user data from DynamoDB using a global secondary index on email)
- List message boards: API Gateway => Lamdba (fetch all records from boards table)
- Create new message board: API Gateway => Lambda => SQS => Lambda => DynamoDB
- Post message: API Gateway => Lambda => SNS => Lambda => DynamoDB

- API tests are included in the postman collection

## Not implemented but could be implemented if there's more time to spare

Subscription to new messages:

- allow user to subscribe to the message boards by adding an entry to the boards table. when user logs in, a list of message boards that he/she subscribed to can be fetched. If using AppSync as the API endpoint, then a 'onMessageCreate' subscription can be use to send out new messages, while filtering out unrelated messages based on the list of boards user wants to see.
- Create a new topic for each message board and allow user to subscribe to that topic

## Things can be improved upon

- Input validation: required fields, unique fields such as email and message board names
- Better error messages and notifications so users know what's happening
- Implement pagination when fetching lots of messages to improve performance
- Some values like 'region' are hard-coded right now. Using an environment variable will be a better option
- Check for message length. If it exceeds the limit of SNS, then might need to split the message into multiple SNS messages.
- Add created_at and updated_at timestamp to messages so they can be sorted
- Add search funtionality for messages text and users.
