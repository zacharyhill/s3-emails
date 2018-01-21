## What this module does
This simple module takes mail objects stored on AWS S3 from AWS SES and parses them returning an array of message objects.
You have to pass in the AWS Bucketname as described below and setup your AWS shared authentication and you should be good to go!

## How to use

In order to use this module, you must have AWS shared credential set up on your computer. You must pass in a configuration object with a property called "Bucket" with your unique AWS bucket name and a property called removeFromBucket with a boolean value.

```javascript
const getNewMessages = require('s3-emails');

getNewMessages.({
  Bucket: 'unique-aws-bucket',
  removeFromBucket: false,
});
```

### Consuming with a promise example:

```javascript
getNewMessages()
.then((messages) => {
	if (!messages.length) {
		console.log('no new messages!');
	}
	else {
		console.log('new messages!\n\n', messages);
	}
})
.catch((err) => {
	console.log(err);
});
```

### Callback Example

```javascript
getNewMessages((messages, err) => {
  if (!err) {
  	if (!messages.length) {
      console.log('no new messages!');
    }
    else {
      console.log('new messages!\n\n', messages);
    }
  } else {
    console.log('err', err);
  }
});
```
