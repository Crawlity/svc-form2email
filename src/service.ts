const validate = (form : object) =>
    form &&
    Object.keys(form).length > 0 &&
    // Add validation rules here
    !(form["FirstName"] || "").match(/\d+/g); // no digits in FirstName


export type Sender = (toAndFromEmail : string, subject : string, text: string) => Promise<void>;
export type Formatter = (form : object) => string;

export class Service {
  static submitForm(form : object, send : Sender, format : Formatter) : Promise<void>{
    const subjectFieldKey = process.env.SUBJECT_FIELD_KEY || "subject"
    const toAndFrom = process.env.TO_FROM_EMAIL || 'noreply@default.com';
    return validate(form) 
      ? send(
          toAndFrom,
          form[subjectFieldKey] || process.env.DEFAULT_SUBJECT || "New message from Form2Email", 
          format(form))
      : Promise.reject(
          "Validation error: No input or invalid input received");
  }
}
