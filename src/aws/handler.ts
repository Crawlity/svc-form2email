import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import * as qs from 'querystring';
import { Service } from '../service';
import { ses } from './sender';
import { html } from '../formatter';

export const submitForm : Handler = async (event : APIGatewayEvent, context : Context, cb : Callback) => {
  const headers = { "Access-Control-Allow-Origin" : "*" }; // Required for CORS support to work
  try{
    console.log("Received event:", JSON.stringify(event, null, 2));
    await Service.submitForm(qs.parse(event.body), ses, html);
    cb(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: "Success" })
    });
  }
  catch(err){
    cb(null, {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: err })
    });
  }
}
