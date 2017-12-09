import * as aws from 'aws-sdk';
const awsSes = new aws.SES();

export const ses = (subject : string, contents : string) : Promise<any> => {
  const toAndFromAddress = process.env.TO_FROM_EMAIL || 'jimmy.tharpe@gmail.com';
  const charset = 'UTF-8';
  var params = {
    Destination: { ToAddresses: [toAndFromAddress] },
    Message: {
      Body: {
        Html: { Charset: charset, Data: contents },
        Text: { Charset: charset, Data: contents }
      },
      Subject: { Charset: charset, Data: subject || 'Crawlity form submission' }
    },
    ReplyToAddresses: [toAndFromAddress],
    Source: toAndFromAddress
  };

  return awsSes.sendEmail(params, null).promise();
};
