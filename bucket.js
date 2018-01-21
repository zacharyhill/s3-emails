const AWS = require('aws-sdk');

const s3 = new AWS.S3();

let Bucket;

module.exports = {

    /*
    ** takes keys array and gets an unparsed email
    ** for each. returns promise object when all
    ** promises inside are fulfilled
    */
    getEmailsFromKeys: function (keys) {
        const unparsedEmails = keys.map((key) => {
            if (typeof key === 'string') {
                return s3.getObject({
                    Bucket,
                    Key: key,
                }).promise().then((unparsedEmail) => {
                    unparsedEmail.AWSKey = key;
                    return unparsedEmail;
                });
            }
            else {
                throw new Error('Key must be a string!');
            }
        });
        return Promise.all(unparsedEmails);
    },

    /*
    ** get array of all keys on aws s3 bucket
    ** each key represents an unparsed email
    */
    getKeys: function() {
        const MaxKeys = 1000;
        return s3.listObjects({ Bucket, MaxKeys}).promise()
            .then((data) => {
                return data.Contents.map((obj) => {
                    return obj.Key;
                });
            });
    },

    /*
    ** takes array of emails, uses property AWSKey
    ** to remove each object from our S3 bucket
    ** returns emails that were removed from bucket
    */
    removeFromBucket: function(emails) {
        const removedEmails = emails.map((email) => {
            s3.deleteObject({
                Bucket,
                Key: email.AWSKey
            }).promise().then((email) => {
                return email;
            });
        });
        return Promise.all(removedEmails).then(() => {
            return emails;
        });
    },

    /*
    ** set name of s3 bucket. this must be done
    ** before any of these methods will work
    */
    setName: function(name) {
        Bucket = name;
    },
};