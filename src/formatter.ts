import { Formatter } from "./service";

const htmlFormatter = {
  null:   (n : any) => "",
  string: (s : String) => "<p>" + s.replace("\n", "</p>\n<p>") + "</p>",
  array:  (a : Array<any>) => a.reduce((result, item) => result + this.format(item) + "\n", ""),
  object: (o : object) =>
    Object.keys(o).reduce(
      (result, key) =>
        result +
        "  <tr>\n" +
        `    <td>${key}</td>\n` +
        `    <td>${o[key]}</td>\n` +
        "  </tr>\n",
      "<table>\n"
    ) + "</table>",
  format: (o : object) =>
    (o === null
      ? htmlFormatter.null
      : Array.isArray(o) 
        ? htmlFormatter.array 
        : htmlFormatter[typeof o])(o)
};

export const html : Formatter = htmlFormatter.format;