import * as aws from 'aws-sdk';
import { Sender } from '../service';
const awsSes = new aws.SES();

export const ses : Sender = (toAndFromEmail : string, subject : string, contents : string) : Promise<any> => {
  const charset = 'UTF-8';
  var params = {
    Destination: { ToAddresses: [toAndFromEmail] },
    Message: {
      Body: {
        Html: { Charset: charset, Data: contents },
        Text: { Charset: charset, Data: contents }
      },
      Subject: { Charset: charset, Data: subject }
    },
    ReplyToAddresses: [toAndFromEmail],
    Source: toAndFromEmail
  };

  return awsSes.sendEmail(params, null).promise();
}; // todo: Test
