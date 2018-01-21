const bucket = require('./bucket');
const parse = require('./parseMail');

const processNewMail = function(options, optionalCallback) {
    if (options.Bucket === '') {
        throw new Error('Bucket name property must be set!');
    }
    else if (typeof options.removeFromBucket !== 'boolean') {
        throw new Error('removeFromBucket property must be set!');
    }
    else {

        bucket.setName(options.Bucket);

        const results = bucket.getKeys()
            .then(bucket.getEmailsFromKeys)
            .then(parse)
            .then((emails) => {
                if (options.removeFromBucket) {
                    return bucket.removeFromBucket(emails);
                }
                else {
                    return emails;
                }
            });


        // process with promise
        if (!optionalCallback) {
            return results;
        }
        
        // process with callback
        else {
            results.then((data) => {
                optionalCallback(null, data);
            }).catch((err) => {
                optionalCallback(err, null);
            });
        }
    }
};

module.exports = processNewMail;
