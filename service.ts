

const querystring = require("querystring");

const validate = (form : object) =>
    form &&
    Object.keys(form).length > 0 &&
    // Add validation rules here
    !(form["FirstName"] || "").match(/\d+/g); // no digits in FirstName


export type Sender = (subject : string, text: string) => Promise<void>;
export type Formatter = (form : object) => string;

export const submitForm = (form : object, send : Sender, format : Formatter) : Promise<void> => 
    validate(form) 
      ? send(
          form["subject"] || "New message from Form2Email", 
          format(form)
        )
      : Promise.reject(
          "[BadRequest] Validation error: No input or invalid input received"
        );
    // todo: Set default subject based on environment variable