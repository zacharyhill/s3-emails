const { simpleParser } = require('mailparser');

module.exports = function(unparsedEmails) {
    const parsedEmails = unparsedEmails.map((parsedEmail) => {
        const { AWSKey } = parsedEmail;
        return simpleParser(parsedEmail.Body)
            // attach AWS key to parsed email
            .then((email) => {
                if (typeof AWSKey === 'string') {
                    email.AWSKey = AWSKey;
                    return email;
                }
                else {
                    throw new Error('AWSKey must be a string!');
                }
            });
    });
    return Promise.all(parsedEmails);
};