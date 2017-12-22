import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import * as qs from 'querystring';
import { Service } from '../service';
import { ses } from './sender';
import { html } from '../formatter';

export const submitForm : Handler = async (event : APIGatewayEvent, context : Context, cb : Callback) => {
  try{
    console.log("Received event:", JSON.stringify(event, null, 2));
    await Service.submitForm(qs.parse(event.body), ses, html);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      },
      body: JSON.stringify({
        message: "Success"
      })
    }
    cb(null, response);
  }
  catch(err){
    cb(err);
  }
}
