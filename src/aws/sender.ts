import * as aws from 'aws-sdk';
import { Sender } from '../service';
const awsSes = new aws.SES();

export const ses : Sender = (subject : string, contents : string) : Promise<any> => {
  const toAndFrom = process.env.TO_FROM_EMAIL || 'noreply@default.com';
  const charset = 'UTF-8';
  var params = {
    Destination: { ToAddresses: [toAndFrom] },
    Message: {
      Body: {
        Html: { Charset: charset, Data: contents },
        Text: { Charset: charset, Data: contents }
      },
      Subject: { Charset: charset, Data: subject }
    },
    ReplyToAddresses: [toAndFrom],
    Source: toAndFrom
  };

  return awsSes.sendEmail(params, null).promise();
}; // todo: Test
